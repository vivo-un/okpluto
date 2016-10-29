"use strict";

import React from 'react';
import UserList from './userList.jsx';
import MeetupCreation from './meetupCreation.jsx'
import MeetupDialog from './meetupDialog.jsx'
import DialogButton from './dialogButton.jsx'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';



class UserDisplay extends React.Component {

  constructor(props) {
    super(props)
  }


  render () {
    if (this.props.type === 'profile') {
      this.user = this.props.userInfo;
    } else {
      this.user = this.props.user;
    }
    return (
      <div>
        <Card>
          <CardMedia >
            <div className="card-img">
            <img src={this.user.picLink || this.user.profilepic} className="img" alt="Pic"/>
            </div>
          </CardMedia>
          <CardHeader
            title={this.user.dogname}
            subtitle={'At: ' + this.user.loc}
            avatar={this.user.profilepic}
            actAsExpander={false}
            showExpandableButton={false}
          />

          <CardText expandable={false}>

          </CardText>
          <CardActions>
            <DialogButton userId={this.user._id} lat={this.user.lat} lng={this.user.lng} type={this.props.type} userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo} toggleDrawer={this.props.toggleDrawer} toggleProfile={this.props.toggleProfile}/>
          </CardActions>
        </Card>
      </div>
    )
  }

}

module.exports = UserDisplay;
