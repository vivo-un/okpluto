"use strict";

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';

const ProfileEdit = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div>
    <TextField
      hintText="Hint Text"
    /><br />
  </div>
  </MuiThemeProvider>
);


module.exports = ProfileEdit;