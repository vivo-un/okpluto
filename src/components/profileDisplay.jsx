"use strict";


import React from 'react'
import { hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import Paper from 'material-ui/Paper'

class ProfileDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <div className="profile-image">
        <img src={this.props.userInfo.picLink || this.props.userInfo.profilepic} alt="Pic"/>
      </div>
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
        <Paper />
      </MuiThemeProvider>
      </div>
    )
  }
}

module.exports = ProfileDisplay;