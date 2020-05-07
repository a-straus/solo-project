import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function LoginPage({ setUserName, history, setUserId }) {
  const [redirect, setRedirect] = useState(false);
  const [incorrectPw, setIncorrectPw] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: data,
    });
    if (response.status === 404) {
      setRedirect(true);
    }
    if (response.status === 403) {
      setIncorrectPw(true);
    } else {
      const resultData = await response.json();
      setUserName(resultData.username);
      setUserId(resultData.id);
      history.push('/user');
    }
  };
  const IncorrectPassword = () => (
    <div>
      <p>Incorrect Password!</p>
    </div>
  );
  if (redirect) return <Redirect to="/register" />;
  return (
    <div>
      {incorrectPw ? <IncorrectPassword /> : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter username</label>
        <input id="username" name="username" type="text" />
        <br />
        <label htmlFor="password">Enter password</label>
        <input id="password" name="password" type="password" />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}
