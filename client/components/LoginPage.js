import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function LoginPage({ setUserName, history }) {
  const [userExists, setUserExists] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUserExists(false);
    const data = new FormData(event.target);
    const response = await fetch('/api/user/register', {
      method: 'POST',
      body: data,
    });
    if (response.status === 409) {
      setUserExists(true);
    } else {
      const resultData = await response.json();
      setUserName(resultData);
      history.push('/');
    }
  };

  const UserAlreadyExists = () => (
    <div>
      <p>User Already Exists! Please Sign In!</p>
    </div>
  );

  return (
    <div>
      {userExists ? <UserAlreadyExists /> : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter username</label>
        <input id="username" name="username" type="text" />
        <br />
        <label htmlFor="password">Enter password</label>
        <input id="password" name="password" type="password" />
        <br />
        <button>Login / Register</button>
      </form>
    </div>
  );
}
