"use strict"

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import MyTheme from '../theme/theme.js';

const style = {
  marginLeft: '45%',
  marginTop: 40,
  alignContent: 'center'
}

const paperStyle = {
  height: 45,
  width: 140,
  textAlign: 'center',
  display: 'inline-block',
  fontSize: `2em`
};

const Loading = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
    <div >
      <div className="row" style={style}>
        <Paper style={paperStyle} zDepth={2}>Fetching...</Paper>
      </div>
      <div className="row" style={style}>
        <CircularProgress size={120} thickness={5}/>
      </div>
    </div>
  </MuiThemeProvider>
)

module.exports = Loading;