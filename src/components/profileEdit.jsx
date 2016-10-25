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
      picLink:""
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
    updateUser(this.state)
    .then(function (user) {
      console.log(user);
      hashHistory.push('/profile')
    })
  }

  render () {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
          <div className="middle">
          <TextField
            hintText="First Name"
            floatingLabelText="First Name"
            value = {this.state.firstname}
            onChange = {this.handleChange.bind(this, 'firstname')}
          /><br />
          <TextField
            hintText="Last Name"
            floatingLabelText="Last Name"
            value = {this.state.lastname}
            onChange = {this.handleChange.bind(this, 'lastname')}
          /><br />
          <TextField
            hintText="Location"
            floatingLabelText="Location"
            value = {this.state.loc}
            onChange = {this.handleChange.bind(this, 'loc')}
          /><br />
          <TextField
            hintText="Dog Name"
            floatingLabelText="Dog Name"
            value = {this.state.dogname}
            onChange = {this.handleChange.bind(this, 'dogname')}
          /><br />
          <TextField
            hintText="Dog Breed"
            floatingLabelText="Dog Breed"
            value = {this.state.dogBreed}
            onChange = {this.handleChange.bind(this, 'dogBreed')}
          /><br />
          <TextField
            hintText="Dog Age"
            floatingLabelText="Dog Age"
            value = {this.state.dogAge}
            onChange = {this.handleChange.bind(this, 'dogAge')}
          /><br />
          <TextField
            hintText="Dog Profile Pic"
            floatingLabelText="Dog Profile Pic"
            value = {this.state.picLink}
            onChange = {this.handleChange.bind(this, 'picLink')}
          /><br />
          <RaisedButton label="Submit" secondary={true} style={style} onTouchTap={this.handleSubmit.bind(this)}/>
        </div>
      </MuiThemeProvider>
    )
  }

}


module.exports = ProfileEdit;