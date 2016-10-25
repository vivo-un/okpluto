"use strict";


var React = require('react');
//var UsersPage = require('./usersPage.jsx');
var Profile = require('./profile.jsx')

class ProfileDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.info) {
      return (
        <div className = "container profileDisplay">
          <div className = "row">
            {this.props.info.firstname}
          </div>
      </div>
      )
    } else {
      return (
        <div>Loading</div>
      )
    }
  }
}

module.exports = ProfileDisplay;