"use strict";

// Renders profile editing form, updates state on
// profileEditDialog component from user input on form

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import MyTheme from '../theme/theme.js';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { Image } from 'material-ui-image';

class ProfileEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      //switch: false
      switch: this.props.profile.rentDog,
      profilepic: null,
      newProfilePic: false,
      picLink: null,
      newDogPic: false,
    };
  }

// Grabs value from form, updates state of profileEditDialog
  handleChange(prop, event) {
    console.log('prop:', prop);
    console.log('onChange Value', this.props.profile);
    if(prop === 'rentDog'){
      this.props.profile[prop] = !this.state.switch;
    } else if(prop === 'picLink' || prop === 'profilepic') {
      this.props.profile[prop] = this.state[prop];
    } else {
      this.props.profile[prop] = event.target.value;
    }

    this.props.change(this.props.profile);
  };

  handleSwitchChange() {
    this.setState({switch: !this.state.switch});
    //this.setState({this.props.profile.rentDog: !this.props.profile.rentDog });
    //this.setState({switch:!this.props.profile.rentDog});
  };

  onDropProfile(files) {
    var that = this;
    var file = files[0];
    console.log('file:',file);
    var signedUrl, picture;
    axios.get(`/sign-s3?file-name=${file.name}&file-type=${file.type}`)
    .then(function (result) {
      console.log('signedRequest', result.data.signedRequest);
      signedUrl = result.data.signedRequest;
      picture =  result.data.url;
      var options = {
        headers: {
          'Content-Type': file.type
        }
      };
      return axios.put(signedUrl, file, options);
    })
    .then(function (result) {
      console.log(result);
     that.setState({
      profilepic: picture,
      newProfilePic: true
     })
     that.handleChange('profilepic');
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  onDropDogPic(files) {
    var that = this;
    var file = files[0];
    console.log('file:',file);
    var signedUrl, picture;
    axios.get(`/sign-s3?file-name=${file.name}&file-type=${file.type}`)
    .then(function (result) {
      console.log('signedRequest', result.data.signedRequest);
      signedUrl = result.data.signedRequest;
      picture =  result.data.url;
      var options = {
        headers: {
          'Content-Type': file.type
        }
      };
      return axios.put(signedUrl, file, options);
    })
    .then(function (result) {
      console.log(result);
     that.setState({
      picLink: picture,
      newDogPic: true
     })
     that.handleChange('picLink');
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  render () {
    const style = {
          borderWidth: 2,
          borderColor: 'black',
          borderStyle: 'dashed',
          borderRadius: 4,
          margin: 30,
          padding: 30,
          height: 30
    }
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
          <div>
          <TextField
            hintText="First Name"
            floatingLabelText="First Name"
            value = {this.props.profile.firstname}
            onChange = {this.handleChange.bind(this, 'firstname')}
            name = "firstname"
            errorText = {this.props.error.firstname}
          /><br />
          <TextField
            hintText="Last Name"
            floatingLabelText="Last Name"
            value = {this.props.profile.lastname}
            onChange = {this.handleChange.bind(this, 'lastname')}
            name = "lastname"
            errorText = {this.props.error.lastname}
          /><br />
          <TextField
            hintText="Location"
            floatingLabelText="Location"
            value = {this.props.profile.loc}
            onChange = {this.handleChange.bind(this, 'loc')}
            name = "loc"
            errorText = {this.props.error.loc}
          /><br />
          <TextField
              hintText="Email"
              floatingLabelText="Email"
              value = {this.props.profile.email}
              onChange = {this.handleChange.bind(this, 'email')}
              name = "email"
              errorText = {this.props.error.email}
          /><br />
          <div style = {{marginLeft: '1em'}}>
            {(!this.state.newProfilePic) ? (
              <Dropzone onDrop={ this.onDropProfile.bind(this) }
                        style = { style }
                        multiple={ false }
                        accept='image/*'>
                Drop a profile picture here
              </Dropzone>
              ) : (
              <img className='imagePreview'
                     src={ this.state.profilepic }
                     />
            )
            }
          </div>
          <br />
          <TextField
            hintText="Dog Name"
            floatingLabelText="Dog Name"
            value = {this.props.profile.dogname}
            onChange = {this.handleChange.bind(this, 'dogname')}
            name = "dogname"
            errorText = {this.props.error.dogname}
          /><br />
          <TextField
            hintText="Dog Breed"
            floatingLabelText="Dog Breed"
            value = {this.props.profile.dogBreed}
            onChange = {this.handleChange.bind(this, 'dogBreed')}
            name = "dogBreed"
            errorText = {this.props.error.dogBreed}
          /><br />
          <TextField
            hintText="Dog Age"
            floatingLabelText="Dog Age"
            value = {this.props.profile.dogAge}
            onChange = {this.handleChange.bind(this, 'dogAge')}
            name = "dogAge"
            errorText = {this.props.error.dogAge}
          /><br />
          <div style = {{marginLeft: '1em'}}>
            {(!this.state.newDogPic) ? (
              <Dropzone onDrop={ this.onDropDogPic.bind(this) }
                        style = { style }
                        multiple={ false }
                        accept='image/*'>
                Drop your pup's picture here
              </Dropzone>
              ) : (
              <img className='imagePreview'
                     src={ this.state.picLink }
                     />
            )
            }
          </div>
          <br />
          <Toggle
            label="Rent-My-Dog"
            toggled = {this.props.profile.rentDog}
            onClick = {this.handleSwitchChange.bind(this)}
            onToggle = {this.handleChange.bind(this, 'rentDog')}
            name = "rentDog"
            labelPosition="right"
          />
          {this.props.profile.rentDog ? 'On' : 'Off'}
        </div>
      </MuiThemeProvider>
    )
  }

}

//onClick = {this.handleSwitchChange.bind(this)}


module.exports = ProfileEdit;