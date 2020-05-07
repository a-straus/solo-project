import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import Nav from './Nav';
import Auth from '../auth/Authorizer';
import Cookies from 'js-cookie';
import CreateBuilding from './CreateBuilding';
import CreateDoorman from './CreateDoorman';

export default function App() {
  const [userName, setUserName] = useState(
    Cookies.get('token') ? JSON.parse(atob(Cookies.get('token').split('.')[1])).username : ''
  );
  useEffect(() => {
    Auth.isAuthenticated();
  });

  return (
    <Router>
      <div>
        <Nav userName={userName} setUserName={setUserName} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/login"
            render={(props) => <LoginPage {...props} setUserName={setUserName} />}
          />
        </Switch>
        <div>
          <CreateBuilding />
          <CreateDoorman />
        </div>
      </div>
    </Router>
  );
}
