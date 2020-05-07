import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import Nav from './Nav';
import Auth from '../auth/Authorizer';
import Cookies from 'js-cookie';
import CreateBuilding from './CreateBuilding';
import CreateDoorman from './CreateDoorman';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import UserPage from './UserPage';

export default function App() {
  const [userName, setUserName] = useState(
    Cookies.get('token') ? JSON.parse(atob(Cookies.get('token').split('.')[1])).username : ''
  );
  const [userId, setUserId] = useState(
    Cookies.get('token') ? JSON.parse(atob(Cookies.get('token').split('.')[1])).id : ''
  );
  useEffect(() => {
    Auth.isAuthenticated();
  });

  //const history = useHistory();

  return (
    <Router>
      <div>
        <Nav userName={userName} setUserName={setUserName} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/register"
            render={(props) => (
              <RegisterPage {...props} setUserName={setUserName} setUserId={setUserId} />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <LoginPage {...props} setUserName={setUserName} setUserId={setUserId} />
            )}
          />
          <PrivateRoute path="/user" component={UserPage} userId={userId}></PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}
