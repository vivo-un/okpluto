"use strict";

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MyTheme from '../theme/theme.js';
import Dialog from 'material-ui/Dialog';
import MeetupCreation from './meetupCreation.jsx'

class MeetupDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Create Event"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
        //TODO: add submit to create meetup
      />
    ]
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
        <div>
          <RaisedButton onTouchTap={this.handleOpen} label="Let's Meetup!" secondary={true}/>
          <Dialog title="Meetup Creation" actions={actions} modal={true} open={this.state.open} onRequestClose={this.handleClose} autoScrollBodyContent={true}>
            <MeetupCreation lat={this.props.lat} lng={this.props.lng} targetUser={this.props.userId}/>
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}

module.exports = MeetupDialog;