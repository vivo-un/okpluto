"use strict";

import React from 'react';
//import RentalButton from './rentalButton.jsx'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import RaisedButton from 'material-ui/RaisedButton';
import { hashHistory } from 'react-router';


class RentalDisplay extends React.Component {

  render () {
    return (
      <div>
        <Card>
          <CardMedia>
            <img src={this.props.user.picLink || this.props.user.profilepic} className="card-img" alt="Pic"/>
          </CardMedia>

          <CardHeader
            title={this.props.user.dogname}
            subtitle={'From: ' + this.props.user.loc}
            avatar={
              <Avatar
                src={this.props.user.profilepic}
                style={{float: 'right', marginTop: -35, marginLeft:20}}>
              </Avatar>
            }
            actAsExpander={true}
            showExpandableButton={true}
          />

          <CardText expandable={true}>
            <strong>Owner:</strong> {this.props.user.firstname}<br />
            <strong>Age: </strong>{this.props.user.dogAge}<br />
            <strong>Breed: </strong>{this.props.user.dogBreed}<br />
          </CardText>

          <CardActions>
            <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
              <div>
          <RaisedButton
            onTouchTap={() => hashHistory.push(`/dogprofile/${this.props.user.username}`)}
            label="Rent Me!"
            primary={true}
          />
          </div>
          </MuiThemeProvider>
          </CardActions>
        </Card>
      </div>
    )
  }

}

module.exports = RentalDisplay;