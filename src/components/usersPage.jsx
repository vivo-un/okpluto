"use strict";

var UserList = require('./userList.jsx');
//var User = require('./user.jsx');
import { findUser, updateUser, getUsers } from '../services/userServices.js'
import NavLoggedIn from './nav-loggedIn.jsx';
import React, { PropTypes as T } from 'react';
import AuthService from '../utils/AuthService.jsx';
//import Auth0Lock from '../../node_modules/auth0-lock';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import MyTheme from '../theme/theme.js';

class UsersPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: '',
      displayedUsers: [],
      searchSource: []
    };
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    var self = this;
    getUsers()
    .then((users) => {
      self.setState({users: users.users})
      self.setState({displayedUsers: users.users})
      var searchArray = [];
      users.users.forEach(user => {
        searchArray.push(user.firstname + ' ' + user.lastname, user.dogname)
      })
      self.setState({searchSource: searchArray})
    })
  }


  handleChange(text, userNames) {
    var displayedUsers = this.state.users.filter(user => {
      if (user.dogname === undefined) user.dogname = '';
      var re = new RegExp(text, "gi")
      var name = user.firstname + ' ' + user.lastname;
      return name.match(re) || user.dogname.match(re)
      })
      this.setState({displayedUsers: displayedUsers})
  }

  render () {
    var style = {
      'top': '40px',
      'left': '20px',
      'position': 'absolute'
    }
    return (
      <div>
        <NavLoggedIn auth={this.props.auth}/>
          <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
               <AutoComplete style={style}
                 floatingLabelText="Search Users"
                 filter={AutoComplete.fuzzyFilter}
                 dataSource={this.state.searchSource}
                 maxSearchResults={5}
                 searchText={this.state.search}
                 onUpdateInput={this.handleChange}
                 onNewRequest={this.handleChange}
               />
          </MuiThemeProvider>
        <UserList users={this.state.displayedUsers} />
      </div>
    )
  }

}

UsersPage.propTypes = {
  location: T.object,
  auth: T.instanceOf(AuthService)
};

module.exports = UsersPage;
