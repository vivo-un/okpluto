"use strict";


var React = require('react');
//var UsersPage = require('./usersPage.jsx');
var Profile = require('./profile.jsx')
import { hashHistory } from 'react-router';

class ProfileDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user) {
      return (
      <div className = "col-md-4 text-center profile">
          <div className = "container">
            <ul>
              <img src={this.props.user.profilepic}/>
              <li>First Name : { this.props.user.firstname}</li>
              <li>Last Name : { this.props.user.lastname}</li>
              <li>Dog Name : { this.props.user.dogname}</li>
              <li>Dog Likes : {this.props.user.dogLikes}</li>
              <li>Dog Breed : { this.props.user.dogBreed}</li>
              <li>Dog Age : { this.props.user.dogAge}</li>
              <button onClick={() => hashHistory.push('/creation')}>Edit your profile</button>
            </ul>
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