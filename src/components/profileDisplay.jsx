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
    const style = {
      height: 100,
      width: '100%',
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
    return (
      <div>
      <div className="profile-image">
        <img src={this.props.userInfo.profilepic} alt="Pic"/>
      </div>
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
        <div>
        <Paper style={style} zDepth={1} rounded={false}>
          <div className={"profile-header"}><h3> Your Info </h3></div>
          <h4>Name: {this.props.userInfo.firstname} {this.props.userInfo.lastname}</h4>
          <h4>Location {this.props.userInfo.loc}</h4>
          <h4></h4>
        </Paper>
        <div className="profile-image">
        <img src={this.props.userInfo.picLink} alt="Pic"/>
      </div>
        <Paper style={style} zDepth={1} rounded={false}>
          <div className={"profile-header"}><h3> Your Pup's Info </h3></div>
          <h4>Name: {this.props.userInfo.dogname}</h4>
          <h4>Location {this.props.userInfo.loc}</h4>
          <h4></h4>
        </Paper>
        </div>
      </MuiThemeProvider>
      </div>
    )
  }
}

module.exports = ProfileDisplay;