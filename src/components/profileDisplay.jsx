"use strict";


var React = require('react');
//var UsersPage = require('./usersPage.jsx');
var Profile = require('./profile.jsx')
import { hashHistory } from 'react-router';
import Loading from './loading.jsx'
import UserDisplay from './user.jsx'

class ProfileDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <UserDisplay userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo} type={'profile'}/>
    )
  }
}

module.exports = ProfileDisplay;