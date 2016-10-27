"use strict";

var React = require('react');
import { hashHistory } from 'react-router';
class NavLoggedIn extends React.Component {

  render () {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand">Ok Pluto</a>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li>
                    <a onClick={() => hashHistory.push('/users')}>Show Users</a>
                </li>
                <li>
                    <a onClick={() => hashHistory.push('/profile')}>My Account</a>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a onClick={this.props.auth.logout.bind(this)}>Log Out</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

module.exports = NavLoggedIn;