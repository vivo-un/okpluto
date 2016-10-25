"use strict"

import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import CircularProgress from 'material-ui/styles/CircularProgress'

const Loading = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
    <CircularProgress size={80} thickness={5}/>
  </MuiThemeProvider>
)

module.exports = Loading;