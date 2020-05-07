import React from 'react';
import Auth from '../auth/Authorizer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  useRouteMatch,
} from 'react-router-dom';

export default function Nav({ userName, setUserName }) {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {Auth.isAuthenticated() ? (
            <span>
              <Link to="/:user_id">{userName}</Link>
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
                Auth.logout(setUserName);
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
