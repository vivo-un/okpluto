"use strict";

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import MyTheme from '../theme/theme.js';
import { findUser, updateUser } from '../services/userServices.js';
import RaisedButton from 'material-ui/RaisedButton';
import { hashHistory } from 'react-router';

const style = {
  'position': 'fixed',
  'margin-left':30
};

const rValidImage = /^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/i

const isValidImage = function(url) {
  return url.match(rValidImage)
};



const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstname', 'lastname', 'loc', 'dogname', 'dogBreed', 'dogAge', 'picLink' ]
  requiredFields.forEach(field => {
    if (!values[field].value) {
      errors[field] = 'Required'
    }
  })
  if (parseInt(values.dogAge.value) !== NaN) {
    errors.dogAge = 'Please enter a number'
  }
  if (!isValidImage(values.picLink.value)) {
    errors.picLink = 'Invalid Url'
  }
  return errors
}

class ProfileEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      loc: "",
      dogname: "",
      dogBreed: "",
      dogAge: "",
      picLink:"",
      errorText: {}
    };
  }

  componentDidMount() {
    var self = this;
    findUser()
      .then((user) => {
        this.setState({"firstname": user.firstname});
        this.setState({"lastname": user.lastname})
        this.setState({"loc": user.loc});
        this.setState({"dogname": user.dogname});
        this.setState({"dogBreed": user.dogBreed});
        this.setState({"dogAge": user.dogAge});
        this.setState({"picLink": user.picLink});
        console.log(this.state);
    })
  }

  handleChange(prop, event) {
    let change = {};
    change[prop] = event.target.value
    this.setState(change);
  }

  handleSubmit() {
    let errors = validate(profile);
    //
    if (Object.keys(errors).length === 0) {
      updateUser(this.state)
        .then(function (user) {
        hashHistory.push('/profile')
      });
    }
    this.setState({"errorText": errors});
    console.log(this.state);
  }

  render () {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
          <div className="middle">
          <form name="profile">
          <TextField
            hintText="First Name"
            floatingLabelText="First Name"
            value = {this.state.firstname}
            onChange = {this.handleChange.bind(this, 'firstname')}
            name = "firstname"
            errorText = {this.state.errorText.firstname}
          /><br />
          <TextField
            hintText="Last Name"
            floatingLabelText="Last Name"
            value = {this.state.lastname}
            onChange = {this.handleChange.bind(this, 'lastname')}
            name = "lastname"
            errorText = {this.state.errorText.lastname}
          /><br />
          <TextField
            hintText="Location"
            floatingLabelText="Location"
            value = {this.state.loc}
            onChange = {this.handleChange.bind(this, 'loc')}
            name = "loc"
            errorText = {this.state.errorText.loc}
          /><br />
          <TextField
            hintText="Dog Name"
            floatingLabelText="Dog Name"
            value = {this.state.dogname}
            onChange = {this.handleChange.bind(this, 'dogname')}
            name = "dogname"
            errorText = {this.state.errorText.dogname}
          /><br />
          <TextField
            hintText="Dog Breed"
            floatingLabelText="Dog Breed"
            value = {this.state.dogBreed}
            onChange = {this.handleChange.bind(this, 'dogBreed')}
            name = "dogBreed"
            errorText = {this.state.errorText.dogBreed}
          /><br />
          <TextField
            hintText="Dog Age"
            floatingLabelText="Dog Age"
            value = {this.state.dogAge}
            onChange = {this.handleChange.bind(this, 'dogAge')}
            name = "dogAge"
            errorText = {this.state.errorText.dogAge}
          /><br />
          <TextField
            hintText="Dog Profile Pic"
            floatingLabelText="Dog Profile Pic"
            value = {this.state.picLink}
            onChange = {this.handleChange.bind(this, 'picLink')}
            name = "picLink"
            errorText = {this.state.errorText.picLink}
          /><br />
          <RaisedButton label="Submit" secondary={true} style={style} onTouchTap={this.handleSubmit.bind(this)}/></form>
        </div>
      </MuiThemeProvider>
    )
  }

}


module.exports = ProfileEdit;