"use strict";

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import MyTheme from '../theme/theme.js';
import { findUser, updateUser } from '../services/userServices.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    }
  }

  componentDidMount() {
    var self = this;
    findUser()
      .then((user) => {
        self.setState({'currentUser': user});
        console.log(this.state.currentUser.firstname)
    })
  }

  render () {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
          <div className="middle">
          <TextField
            hintText="First Name"
            floatingLabelText="First Name"
            defaultValue = {this.state.currentUser.firstname}
          /><br />
          <TextField
            hintText="Last Name"
            floatingLabelText="Last Name"
          /><br />
          <TextField
            hintText="Location"
            floatingLabelText="Location"
          /><br />
          <TextField
            hintText="Dog Name"
            floatingLabelText="Dog Name"
          /><br />
          <TextField
            hintText="Dog Breed"
            floatingLabelText="Dog Breed"
          /><br />
          <TextField
            hintText="Dog Age"
            floatingLabelText="Dog Age"
          /><br />
          <TextField
            hintText="Dog Profile Pic"
            floatingLabelText="Dog Profile Pic"
          /><br />
        </div>
      </MuiThemeProvider>
    )
  }

}


module.exports = ProfileEdit;