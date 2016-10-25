'use strict';

import userServices from '../services/userServices.js'
import NavLoggedIn from './nav-loggedIn.jsx';
import React, { PropTypes as T } from 'react';
import AuthService from '../utils/AuthService.jsx';
import Auth0Lock from '../../node_modules/auth0-lock';
import ProfileDisplay from './profileDisplay.jsx';

//EXAMPLE USAGE:
// findUser()
  // .then(user => {
  //   console.log(user)
  // });

//Property names in object passed to this function must match property names in mongo user schema
  // updateUser({dogname: 'sparky', dogBreed: 'mix', dogAge: 7})
  // .then(updateUser => {
  //   console.log(updateUser)
  // })

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {info: {}, complete: false};
  }



  componentDidMount() {
    var self = this;
    userServices.findUser()
    .then(user => {
      console.log(user);
      self.setState({info: user, complete: true});
      console.log(this.state);
    })
  }


  render () {
    console.log(this.props);
    return (
      <div>
        <NavLoggedIn auth={this.props.auth}/>
        <ProfileDisplay user={this.state.info} status={this.state.complete}/>
      </div>
    )
  }
}

Profile.propTypes = {
  location: T.object,
  auth: T.instanceOf(AuthService)
};

module.exports = Profile;