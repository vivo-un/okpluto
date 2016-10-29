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
import Banner from './banner.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendingEvents: [],
      noAttendingEvents: false,
      createdEvents: [],
      noCreatedEvents: false,
      value: 'a'
    }
  }

  componentDidMount() {
    var self = this;
    searchEvents()
    .then(events => {
      if(!events.attendingEvents.length) {
        self.setState({attendingEvents: []})
        self.setState({noAttendingEvents: true})
      } else {
        self.setState({attendingEvents: events.attendingEvents})
      }
      if(!events.createdEvents.length) {
        self.setState({createdEvents: []})
        self.setState({noCreatedEvents: true})
      } else {
        self.setState({createdEvents: events.createdEvents})
      }
    })
  }

  handleChange(value) {
    this.setState({
      value: value
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
        <Banner />
        <div className="container">
        <div className="col-md-3 profile">
          <ProfileDisplay userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo}/>
        </div>

        <div className="col-md-9 profile-events">
          <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)} >
            <Tabs
              value={this.state.value} >
              <Tab label="My Events List" value='a' onActive={() => this.handleChange('a') }>
                <div>
                  <EventList events={this.state.attendingEvents} noEvents={this.state.noAttendingEvents}/>
                </div>
              </Tab>
              <Tab label="Created by Me" value='b' onActive={() => this.handleChange('b') }>
                <div>
                  <EventList events={this.state.createdEvents} noEvents={this.state.noCreatedEvents}/>
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