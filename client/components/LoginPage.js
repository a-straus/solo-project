import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function LoginPage(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const response = await fetch('/api/user/register', {
      method: 'POST',
      body: data,
    });
    const resultData = await response.json();
    props.setUserName(resultData);
    props.history.push('/');
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter username</label>
        <input id="username" name="username" type="text" />
        <label htmlFor="password">Enter password</label>
        <input id="password" name="password" type="password" />
        <button>Login</button>
      </form>
    </div>
  );
}
