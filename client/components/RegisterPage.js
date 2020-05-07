import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function RegisterPage({ setUserName, history, setUserId }) {
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const response = await fetch('/api/user/register', {
      method: 'POST',
      body: data,
    });
    if (response.status === 409) {
      setRedirect(true);
    } else {
      const resultData = await response.json();
      setUserName(resultData.username);
      setUserId(resultData.id);
      history.push('/user');
    }
  };
  if (redirect) return <Redirect to="/login" />;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter username</label>
        <input id="username" name="username" type="text" />
        <br />
        <label htmlFor="password">Enter password</label>
        <input id="password" name="password" type="password" />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
}
