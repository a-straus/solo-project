import React from 'react';
import Auth from '../auth/Authorizer';
import { NavLink, Link, useHistory } from 'react-router-dom';

export default function Nav({ userName, setUserName }) {
  const history = useHistory();
  return (
    <div id="nav">
      <span>
        {Auth.isAuthenticated() ? (
          <span>
            <NavLink className="nav-item" id="user" to="/user">
              {userName}
            </NavLink>
          </span>
        ) : (
          <div>
            <NavLink className="nav-item" to="/register">
              <button className="nav-item">Register</button>
            </NavLink>

            <NavLink className="nav-item" to="/login">
              <button className="nav-item">Login</button>
            </NavLink>
          </div>
        )}
      </span>
      <span>
        <NavLink className="nav-item" to="/">
          <strong>Home</strong>
        </NavLink>
      </span>

      {Auth.isAuthenticated() ? (
        <span>
          <button
            className="nav-item"
            onClick={() => {
              Auth.logout(() => {});
              history.push('/');
            }}
          >
            Log Out
          </button>
        </span>
      ) : null}
    </div>
  );
}
