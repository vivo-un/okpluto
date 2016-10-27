"use strict";

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MyTheme from '../theme/theme.js';
import Dialog from 'material-ui/Dialog';

import TextField from 'material-ui/TextField';
import { findUser, updateUser } from '../services/userServices.js';
import { hashHistory } from 'react-router';

const style = {
  'position': 'fixed',
  'margin-left':30
};

const rValidImage = /^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/i

const isValidImage = function(url) {
  return true
  //return url.match(rValidImage)
};



const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstname', 'lastname', 'loc', 'dogname', 'dogBreed', 'dogAge', 'picLink' ]
  requiredFields.forEach(field => {
    if (!values[field].value) {
      errors[field] = 'Required'
    }
  })
  if (isNaN(parseInt(values.dogAge.value))) {
    errors.dogAge = 'Please enter a number'
  }
  if (!isValidImage(values.picLink.value)) {
    errors.picLink = 'Invalid Url'
  }
  return errors
}

class ProfileEditDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        firstname: "",
        lastname: "",
        loc: "",
        dogname: "",
        dogBreed: "",
        dogAge: "",
        picLink:""
      },
      errorText: {},
      open: false
    };
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  componentDidMount() {
    var self = this;
    findUser()
      .then((user) => {
        this.setState({"user": user});
      })
  }

  handleChange(prop, event) {
    var newUser = this.state.user;
    newUser[prop] = event.target.value;
    this.setState({'user': newUser});
  }

  handleSubmit() {
    let errors = validate(profile);
    let handleClose = this.handleClose;
    if (Object.keys(errors).length === 0) {
      updateUser(this.state.user)
        .then(function (user) {
        handleClose();
        window.location.reload();
        return true;
      });
    }
    this.setState({"errorText": errors});
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
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />
    ]

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
        <div>
          <RaisedButton onTouchTap={this.handleOpen} label="Edit Profile" secondary={true}/>
          <Dialog title="Edit Profile" modal={false} actions={actions} open={this.state.open} onRequestClose={this.handleClose} autoScrollBodyContent={true} autoDetectWindowHeight={true} >
          <div>
            <div className="middle">
            <form name="profile">
            <TextField
              hintText="First Name"
              floatingLabelText="First Name"
              value = {this.state.user.firstname}
              onChange = {this.handleChange.bind(this, 'firstname')}
              name = "firstname"
              errorText = {this.state.errorText.firstname}
            /><br />
            <TextField
              hintText="Last Name"
              floatingLabelText="Last Name"
              value = {this.state.user.lastname}
              onChange = {this.handleChange.bind(this, 'lastname')}
              name = "lastname"
              errorText = {this.state.errorText.lastname}
            /><br />
            <TextField
              hintText="Location"
              floatingLabelText="Location"
              value = {this.state.user.loc}
              onChange = {this.handleChange.bind(this, 'loc')}
              name = "loc"
              errorText = {this.state.errorText.loc}
            /><br />
            <TextField
              hintText="Dog Name"
              floatingLabelText="Dog Name"
              value = {this.state.user.dogname}
              onChange = {this.handleChange.bind(this, 'dogname')}
              name = "dogname"
              errorText = {this.state.errorText.dogname}
            /><br />
            <TextField
              hintText="Dog Breed"
              floatingLabelText="Dog Breed"
              value = {this.state.user.dogBreed}
              onChange = {this.handleChange.bind(this, 'dogBreed')}
              name = "dogBreed"
              errorText = {this.state.errorText.dogBreed}
            /><br />
            <TextField
              hintText="Dog Age"
              floatingLabelText="Dog Age"
              value = {this.state.user.dogAge}
              onChange = {this.handleChange.bind(this, 'dogAge')}
              name = "dogAge"
              errorText = {this.state.errorText.dogAge}
            /><br />
            <TextField
              hintText="Dog Profile Pic"
              floatingLabelText="Dog Profile Pic"
              value = {this.state.user.picLink}
              onChange = {this.handleChange.bind(this, 'picLink')}
              name = "picLink"
              errorText = {this.state.errorText.picLink}
            /><br />
            </form>
          </div>
        </div>
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}

module.exports = ProfileEditDialog;