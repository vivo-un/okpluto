'use strict';

//Parent component for profile page - pulls event info from database, and controls render for profile info and user's events display

import { searchEvents } from '../services/eventServices.js'
import NavLoggedIn from './nav-loggedIn.jsx';
import React, { PropTypes as T } from 'react';
import AuthService from '../utils/AuthService.jsx';
import DogProfileDisplay from './dogProfileDisplay.jsx';
import EventList from './eventList.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import {Tabs, Tab} from 'material-ui/Tabs'
import Banner from './banner.jsx';
import FooterLoggedIn from './footer-loggedIn.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    //Events load into state after they are pulled from the database. If there are no events in a particular category, "No events to show" will render to the screen
    //state.value controls which tab is active and visible
    this.state = {
      upcomingEvents: [],
      noUpcomingEvents: false,
      pastEvents: [],
      noPastEvents: false,
      createdEvents: [],
      noCreatedEvents: false,
      value: 'a'
    }
  }

// Load events and divide into Upcoming,
// Created by this user, and Past categories
  componentDidMount() {
    var self = this;
    // Event Services helper function
    // Searches for events containing current users DataBase ID
    // Returns both attending events, and events created by this user
    searchEvents()
    .then(events => {
      if(!events.attendingEvents.length) {
        self.setState({upcomingEvents: []})
        self.setState({noUpcomingEvents: true})
        self.setState({pastEvents: []})
        self.setState({noPastEvents: true})
      } else {
        let upcoming = [];
        let past = [];
        // Test if event is future or past
        // Divide into categories
        events.attendingEvents.forEach(event => {
        let date = new Date(event.date.slice(0, 11) + event.time.slice(0, 8))
        if (date > new Date()) {
          upcoming.push(event)
        } else {
          past.push(event)
        }
        })
        if (upcoming.length) {
          self.setState({upcomingEvents: upcoming})
        } else {
          self.setState({upcomingEvents: []})
          self.setState({noUpcomingEvents: true})
        }
        if (past.length) {
          self.setState({pastEvents: past})
        } else {
          self.setState({pastEvents: []})
          self.setState({noPastEvents: true})
        }
      }
      if(!events.createdEvents.length) {
        self.setState({createdEvents: []})
        self.setState({noCreatedEvents: true})
      } else {
        self.setState({createdEvents: events.createdEvents})
      }
    })
  }

  // Changes active / visible tab
  handleChange(value) {
    this.setState({
      value: value
    })
  }

  render () {

    return (
      <div>
        <NavLoggedIn auth={this.props.auth} toggleDrawer={this.props.toggleDrawer}/>
        <Banner display="Your Profile"/>
        <div className="container" style={{marginBottom: 20}}>


          <div className="col-md-9 profile-events">
            <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)} >
              <Tabs
                style={{backgroundColor: 'whitesmoke', paddingBottom: '8px'}}
                value={this.state.value} >
                <Tab label="Details" value='a' onActive={() => this.handleChange('a') }>
                  <div className="dogwrapper">
                    <div className="leftcolumn-dog-details">
                      <div className="profile-image-dog-details">
                        <img src={this.props.userInfo.picLink} alt="Pic"/>
                      </div>
                    </div>
                    <div className="rightcolumn-dog-details">
                      <h4 className="renttitle">Rent Me for $10</h4>
                      <h4><em>Name:</em> {this.props.userInfo.dogname}</h4>
                      <h4><em>Breed:</em> {this.props.userInfo.dogBreed}</h4>
                      <h4><em>Age:</em> {this.props.userInfo.dogAge}</h4>
                      <br />
                      <h4><em>Owner's Name:</em> {this.props.userInfo.firstname} {this.props.userInfo.lastname}</h4>
                      <h4><em>Location:</em> {this.props.userInfo.loc}</h4>
                    </div>
                  </div>
                </Tab>


              </Tabs>
            </MuiThemeProvider>
          </div>
        </div>
        <FooterLoggedIn />
      </div>
    )
  }
}

// Make sure auth0 Service is passed in
// correctly as a prop
Profile.propTypes = {
  location: T.object,
  auth: T.instanceOf(AuthService)
};


//extra tab
//<Tab label="~" value='b' onActive={() => this.handleChange('b') }>
//                  <div>
//                    <EventList type="profile" events={this.state.createdEvents} noEvents={this.state.noCreatedEvents} userInfo={this.props.userInfo}/>
//                  </div>
//                </Tab>
// <Tab label="~" value='c' onActive={() => this.handleChange('c') }>
//                  <div>
//                    <EventList type="profile" events={this.state.pastEvents} noEvents={this.state.noPastEvents} userInfo={this.props.userInfo}/>
//                 </div>
//               </Tab>
//sidebar profile not needed
//<div className="col-md-3 profile">
//            <DogProfileDisplay userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo}/>
//</div>

module.exports = Profile;