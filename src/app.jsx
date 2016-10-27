"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import AuthService from './utils/AuthService.jsx';
import $ from 'jquery';
import Home from './components/home.jsx';
import { auth0 } from '../config/auth0.js';
import UsersPage from './components/usersPage.jsx'
import Container from './components/container.jsx'
import Profile from './components/profile.jsx'
import ProfileCreation from './components/profileCreation.jsx'
import Loading from './components/loading.jsx'
import MeetupCreation from './components/meetupCreation.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';
import api from '../config/api.js'
import GoogleMapsLoader from 'google-maps'


const auth = new AuthService(auth0.AUTH0_CLIENT_ID, auth0.AUTH0_DOMAIN);

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace ({ pathname: '/'})
  }
}

//const passProps = ()
injectTapEventPlugin();

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Container} auth={auth}>
      <IndexRoute component={Home} />
      <Route path="/users" component={UsersPage} onEnter={requireAuth} />
      <Route path="/profile" component={Profile} onEnter={requireAuth} creation={false}/>
      <Route path="/creation" component={ProfileCreation} onEnter={requireAuth} creation={true}/>
      <Route path="access_token=:token" component={Loading} />
    </Route>
  </Router>, $('#app')[0]
);


