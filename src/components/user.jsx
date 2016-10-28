"use strict";

import React from 'react';
import UserList from './userList.jsx';
import MeetupCreation from './meetupCreation.jsx'
import MeetupDialog from './meetupDialog.jsx'
import DialogButton from './dialogButton.jsx'


class UserDisplay extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.type === 'profile') {
      this.user = this.props.userInfo;
    } else {
      this.user = this.props.user;
    }
  }


  render () {

    return (

        <figure className="figure profile">
          <div className="profile-image">
            <img src={this.user.picLink || this.user.profilepic} alt="Pic"/>
          </div>
          <figcaption>
            <h3>{this.user.firstname} {this.user.lastname}</h3>
            <h4>{this.user.loc}</h4>
            <h3>{this.user.dogname}</h3>
            <h4>{this.user.dogBreed}</h4>
            <h4>{this.user.dogAge} years old</h4>
            <DialogButton userId={this.user._id} lat={this.user.lat} lng={this.user.lng} type={this.props.type} userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo}/>
          </figcaption>
        </figure>

    )
  }

}

module.exports = UserDisplay;
