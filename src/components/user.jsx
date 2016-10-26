"use strict";

import React from 'react';
import UserList from './userList.jsx';
import MeetupCreation from './meetupCreation.jsx'
import MeetupDialog from './meetupDialog.jsx'
import DialogButton from './dialogButton.jsx'


class UserDisplay extends React.Component {

  constructor(props) {
    super(props)
    // TBD setState
  }


  render () {

    return (

        <figure className="figure profile">
          <div className="profile-image">
            <img src={this.props.user.picLink || this.props.user.profilepic} alt="Pic"/>
          </div>
          <figcaption>
            <h3>{this.props.user.firstname} {this.props.user.lastname}</h3>
            <h4>{this.props.user.loc}</h4>
            <h3>{this.props.user.dogname}</h3>
            <h4>{this.props.user.dogBreed}</h4>
            <h4>{this.props.user.dogAge} years old</h4>
            <DialogButton userId={this.props.user._id} lat={this.props.user.lat} lng={this.props.user.lng} type={this.props.type}/>
          </figcaption>
        </figure>

    )
  }

}

module.exports = UserDisplay;
