import React from 'react';
import Auth from '../auth/Authorizer';
import { Link, useHistory } from 'react-router-dom';

export default function Nav({ userName, setUserName }) {
  const history = useHistory();
  return (
    <div id="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {Auth.isAuthenticated() ? (
            <span>
              <Link to="/user">{userName}</Link>
            </span>
          ) : (
            <div>
              <Link to="/register">Register</Link>, <Link to="/login">Login</Link>
            </div>
          )}
        </li>
        {Auth.isAuthenticated() ? (
          <li>
            <button
              onClick={() => {
                Auth.logout(() => {});
                history.push('/');
              }}
            >
              Log Out
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
