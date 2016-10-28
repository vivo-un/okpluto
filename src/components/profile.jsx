'use strict';

import userServices from '../services/userServices.js'
import NavLoggedIn from './nav-loggedIn.jsx';
import React, { PropTypes as T } from 'react';
import AuthService from '../utils/AuthService.jsx';
import Auth0Lock from '../../node_modules/auth0-lock';
import ProfileDisplay from './profileDisplay.jsx';
import Events from './events.jsx'

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }



  render () {
    return (
      <div>
        <NavLoggedIn auth={this.props.auth} toggleDrawer={this.props.toggleDrawer} />
        <div className="row">
          <div className="col-md-3">
            <ProfileDisplay userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo}/>
          <div className ="col-md-8">
            <Events />
          </div>
          </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  location: T.object,
  auth: T.instanceOf(AuthService)
};

module.exports = Profile;