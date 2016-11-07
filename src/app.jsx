"use strict";

//Controls React Routes, sets up auth0 service

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import AuthService from './utils/AuthService.jsx';
import $ from 'jquery';
import injectTapEventPlugin from 'react-tap-event-plugin';
//components
import Home from './components/home.jsx';
import UsersPage from './components/usersPage.jsx'

import Container from './components/container.jsx'
import Profile from './components/profile.jsx'
import DogProfile from './components/dogProfile.jsx'
import Events from './components/events.jsx'
import ProfileCreation from './components/profileCreation.jsx'
import Loading from './components/loading.jsx'
import InfoDrawer from './components/infoDrawer.jsx'
import DogRental from './components/rentalPage.jsx'
import axios from 'axios';
// import env from 'env-variable';
// env();
var env;
var auth;
var loggedIn = true;

axios.get('/env')
  .then(function(response){
    console.log(response.body);
    console.log(response.data);
    env = response.data;
    auth = new AuthService(env, 'vivou.auth0.com');
    // Setting up auth service


    // check for authenication in all protected routes
    const requireAuth = (nextState, replace) => {
      if (!auth.loggedIn()) {
        replace ({ pathname: '/'})
      }
    }

    // Allows onTouchTap to work in material ui components
    injectTapEventPlugin();

    // Container is a parent route that passes authenication service to all
    // of its children
    // Info drawer is a parent route that loads in the current users info,
    // and passes it as props to all direct child routes
    // "access_token" route is so auth0 login has a route that matches it
    // otherwise login will fail
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Container} auth={auth}>
      <IndexRoute component={Home} />
      <Route component={InfoDrawer}>
        <Route path="/users" component={UsersPage}/>
        <Route path="/events" component={Events} creation={false}/>
        <Route path="/profile" component={Profile} onEnter={requireAuth} creation={false}/>
        <Route path="dogprofile/:id" component={DogProfile} creation={false}/>
        <Route path="rental" component={DogRental} creation={false}/>
      </Route>
      <Route path="/creation" component={ProfileCreation} onEnter={requireAuth} creation={true}/>
      <Route path="access_token=:token" component={Loading} />
    </Route>
  </Router>, $('#app')[0]
);
  })
  .catch(function(err){
    console.log(err);
  });


