'use strict';

import { searchEvents } from '../services/eventServices.js'
import NavLoggedIn from './nav-loggedIn.jsx';
import React, { PropTypes as T } from 'react';
import AuthService from '../utils/AuthService.jsx';
import Auth0Lock from '../../node_modules/auth0-lock';
import ProfileDisplay from './profileDisplay.jsx';
import EventList from './eventList.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import {Tabs, Tab} from 'material-ui/Tabs'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    var self = this;
    searchEvents()
    .then(events => {
      console.log(events)
      this.setState({events: events})
    })
  }

  render () {
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };
    return (
      <div>
        <NavLoggedIn auth={this.props.auth} toggleDrawer={this.props.toggleDrawer}/>
        <div className="container">
        <div className="col-md-3 profile">
          <ProfileDisplay userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo}/>
        </div>

        <div className="col-md-9 profile-events">
          <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
            <Tabs>
              <Tab label="Item One" >
                <div>
                  <EventList events={this.state.events} />
                </div>
              </Tab>
              <Tab label="Item Two" >
                <div>
                  <h2 style={styles.headline}>Tab Two</h2>
                  <p>
                    This is another example tab.
                  </p>
                </div>
              </Tab>
            </Tabs>
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