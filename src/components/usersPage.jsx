"use strict";

var UserList = require('./userList.jsx');
var User = require('./user.jsx');
import userServices from '../services/userServices.js'
import NavLoggedIn from './nav-loggedIn.jsx';
import React, { PropTypes as T } from 'react';
import AuthService from '../utils/AuthService.jsx';
import Auth0Lock from '../../node_modules/auth0-lock';

class UsersPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    var self = this;
    userServices.getUsers()
    .then((users) => {
      self.setState({users: users.users})
      console.log(this.state)
    })
  }

  render () {
    return (
      <div>
        <NavLoggedIn auth={this.props.auth}/>
        <UserList users={this.state.users} />
      </div>
    )
  }

}

UsersPage.propTypes = {
  location: T.object,
  auth: T.instanceOf(AuthService)
};

module.exports = UsersPage;
