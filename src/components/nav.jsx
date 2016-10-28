"use strict";

import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import AppBar from 'material-ui/AppBar'


class Navigation extends React.Component {

  render () {
    return (
      <div>
        <AppBar />
      </div>
    )
  }
}

module.exports = Navigation;

/* <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Ok Pluto</a>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                    <a href='#' onClick={this.props.auth.login.bind(this)}>Sign In</a>
                </li>
              </ul>
            </div>
          </div>
        </nav> */