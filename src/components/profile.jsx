'use strict';

import userServices from '../services/userServices.js'
import NavLoggedIn from './nav-loggedIn.jsx';
import React, { PropTypes as T } from 'react';
import AuthService from '../utils/AuthService.jsx';
import Auth0Lock from '../../node_modules/auth0-lock';
import ProfileDisplay from './profileDisplay.jsx';
import Events from './events.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import {Tabs, Tab} from 'material-ui/Tabs'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  render () {
    return (
      <div>
        <NavLoggedIn auth={this.props.auth} toggleDrawer={this.props.toggleDrawer}/>
        <div className="container">
        <div className="col-md-3 profile">
          <ProfileDisplay userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo}/>
        </div>

        <div className="col-md-9">
          <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
            <Tabs></Tabs>
          </MuiThemeProvider>
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