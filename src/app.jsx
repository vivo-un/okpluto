"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, Link, hashHistory } from 'react-router';
import AuthService from './utils/AuthService.jsx';
import $ from 'jquery';
import Home from './components/home.jsx';
import { auth0 } from '../config/auth0.js';
import UsersPage from './components/usersPage.jsx'
import Container from './components/container.jsx'
import Profile from './components/profile.jsx'
import ProfileEdit from './components/profileEdit.jsx'

const auth = new AuthService(auth0.AUTH0_CLIENT_ID, auth0.AUTH0_DOMAIN);

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace ({ pathname: '/'})
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="/home" component={Home} />
      <Route path="/users" component={UsersPage} onEnter={requireAuth} />
      <Route path="/profile" component={Profile} onEnter={requireAuth} creation={false}/>
      <Route path="/creation" component={ProfileEdit} onEnter={requireAuth} creation={true}/>
      <Route path="access_token=:token" component={Home} />
    </Route>
  </Router>, $('#app')[0]
);
