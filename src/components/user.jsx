"use strict";

import React from 'react';
import UserList from './userList.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import MyTheme from '../theme/theme.js';

class MeetupButton extends React.Component {
  getUrl() {
    return '#/meetup/' + this.props.userId;
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
        <div>
          <RaisedButton href={this.getUrl()} label="Let's Meetup!" secondary={true}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

class UserDisplay extends React.Component {

  constructor(props) {
    super()
    // TBD setState
  }

  render () {
    return (
      <div className = "col-md-4 text-center">
        <figure className="figure profile">
          <div className="profile-image">
            <img src={this.props.user.profilepic} alt=""/>
          </div>
          <figcaption>
            <h3>{this.props.user.firstname} {this.props.user.lastname}</h3>
            <h4>{this.props.user.loc}</h4>
            <h3>{this.props.user.dogname}</h3>
            <h4>{this.props.user.dogBreed}</h4>
            <h4>{this.props.user.dogAge} years old</h4>
            <MeetupButton userId={this.props.user._id}/>
          </figcaption>
        </figure>
      </div>
    )
  }

}

module.exports = UserDisplay;
