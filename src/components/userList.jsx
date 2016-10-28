"use strict";


var React = require('react');
var UserDisplay = require('./user.jsx')
import Loading from './loading.jsx'

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.users.length) {
      return (
        <div className = "container userList">
          <div className = "row">
            {this.props.users.map(person =>
              <div className = "col-md-4 text-center">
                <UserDisplay user={person} userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo} type={'user'}/>
              </div>
              )}
          </div>
      </div>
      )
    } else {
      return (
        <Loading />
      )
    }
  }
}

module.exports = UserList;
