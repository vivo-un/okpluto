"use strict";

var React = require('react');
var UserList = require('./userList.jsx');

class UserDisplay extends React.Component {

  constructor(props) {
    super()
    // TBD setState
  }

  render () {
    return (
      <div className = "col-md-4 text-center">
        <figure className="figure profile">
          <div className="profile-image">
            <img src={this.props.user.profilepic} alt=""/>
          </div>
          <figcaption>
            <h3>{this.props.user.firstname} {this.props.user.lastname}</h3>
            <h4>{this.props.user.loc}</h4>
            <h3>{this.props.user.dogname}</h3>
            <h4>{this.props.user.dogBreed}</h4>
            <h4>{this.props.user.dogAge} years old</h4>
          </figcaption>
        </figure>
      </div>
    )
  }

}

module.exports = UserDisplay;
