"use strict";

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MyTheme from '../theme/theme.js';
import Dialog from 'material-ui/Dialog';
import ProfileEdit from './profileEdit.jsx'

class ProfileEditDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    console.log(this.refs)
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  render() {

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
        <div>
          <RaisedButton onTouchTap={this.handleOpen} label="Edit Profile" secondary={true}/>
          <Dialog title="Edit Profile" modal={false} open={this.state.open} onRequestClose={this.handleClose} autoScrollBodyContent={true} autoDetectWindowHeight={true} >
            <ProfileEdit handleClose={this.handleClose}/>
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}

module.exports = ProfileEditDialog;