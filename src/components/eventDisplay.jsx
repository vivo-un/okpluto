"use strict";

import React from 'react';
import Loading from './loading.jsx'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import { findUser } from '../services/userServices.js'
import { addPerson } from '../services/eventServices.js'

class EventDisplay extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      attendees: [],
      eventId: this.props.event._id
    };
    this.join = this.join.bind(this);
  }

  componentWillMount() {
    findUser(this.props.event.creator)
    .then(user => {
      let name = user.firstname + ' ' + user.lastname
      this.setState({creator: name, creatorDog: user.dogname, pic: user.profilepic})
    })
    let attendees = this.state.attendees;
    this.props.event.attendees.forEach(attendee => {
      findUser(attendee)
      .then(person =>{
        let people = attendees;
        people.push('\n' + person.firstname)
        this.setState({attendees: people})
      })
    })
  }

  join() {
    let eventId = this.state.eventId;
    addPerson(eventId)
  }


  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
      <Card>
    <CardHeader
      title={'Created by: ' + this.state.creator}
      subtitle={'Best Friend: ' + this.state.creatorDog}
      avatar={this.state.pic}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardMedia
      overlay={<CardTitle title={this.props.event.eventname} subtitle={this.props.event.loc} />}
    >
      <img src="../../assets/meetUp.png" />
    </CardMedia>
    <CardText expandable={true}>
      <strong>Who's going:</strong>{this.state.attendees.map((person, i) => {
        if (i !== this.state.attendees.length - 1) {
          person += ',';
        }
        return person
      })}
    </CardText>
    <CardActions>
      <FlatButton label="Join" onClick={this.join}/>
    </CardActions>
  </Card>
  </MuiThemeProvider>
    )
  }
}

 /*<figure className="figure profile">
        <div className="profile-image">
          <img src={this.props.event.picLink} alt="Pic"/>
        </div>
        <figcaption>
          <h3>{this.props.event.eventname}</h3>
          <h4>{this.props.event.loc}</h4>
          <h3>{this.props.event.date}</h3>
          <h4>{this.props.event.time}</h4>
          <h4>{this.props.event.attendees} years old</h4>
        </figcaption>
      </figure>*/

module.exports = EventDisplay;