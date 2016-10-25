"use strict";

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import MyTheme from '../theme/theme.js';

const ProfileEdit = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
    <div className="middle">
    <TextField
      hintText="First Name"
      floatingLabelText="First Name"
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
);


module.exports = ProfileEdit;