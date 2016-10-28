"use strict";


var React = require('react');
var UserDisplay = require('./user.jsx')
import Loading from './loading.jsx'

const Row = (props) => (
  <div className="row">
    {
      props.row.map((user) => (
        <div className= "col-md-4 text-center">
          <UserDisplay user={user} type='user' />
        </div>
      ))
    }
  </div>
)

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.users.length) {
      var users = this.props.users;
      var rows = [];
      var row = [];
      for (var i = 0; i < users.length; i++) {
        if (i % 3 === 0 && row.length > 0) {
          rows.push(row);
          row = [];
        }
        row.push(users[i]);
        if (i === users.length - 1 && row.length > 0) {
          rows.push(row);
        }
      }
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
