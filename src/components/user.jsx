"use strict";

import React from 'react';
import UserList from './userList.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MyTheme from '../theme/theme.js';
import Dialog from 'material-ui/Dialog';
import MeetupCreation from './meetupCreation.jsx'

class MeetupDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />
      <FlatButton
        label="Create Event"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ]
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
        <div>
          <RaisedButton onTouchTap={this.handleOpen} label="Let's Meetup!" secondary={true}/>
          <Dialog title="Meetup Creation" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>
            <MeetupCreation />
          </Dialog>
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
            <MeetupDialog userId={this.props.user._id}/>
          </figcaption>
        </figure>
      </div>
    )
  }

}

module.exports = UserDisplay;
