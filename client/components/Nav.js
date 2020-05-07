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

export default function Nav(props) {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {Auth.isAuthenticated() ? (
              <Link to="/:user_id">{props.userName}</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
          {Auth.isAuthenticated() ? (
            <li>
              <button
                onClick={() => {
                  Auth.logout(props.setUserName);
                }}
              >
                Log Out
              </button>
            </li>
          ) : null}
        </ul>
      </div>
    </Router>
  );
}
