"use strict";

var React = require('react');

class Navigation extends React.Component {

  render () {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
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
        </nav>
      </div>
    )
  }
}

module.exports = Navigation;