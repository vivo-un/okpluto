"use strict";

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import MyTheme from '../theme/theme.js';

const ProfileEdit = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
    <div>
    <TextField
      hintText="Hint Text"
    /><br />
  </div>
  </MuiThemeProvider>
);


module.exports = ProfileEdit;