 "use strict";

// This shows the first time a user signs in
// It steps through the sign up process
// to get user's profile info



import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MyTheme from '../theme/theme.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import { findUser, updateUser } from '../services/userServices.js';
import { hashHistory } from 'react-router';
import {bindAll} from 'lodash';
import $ from 'jquery';
import { Image } from 'material-ui-image';
import axios from 'axios';

const rValidImage = /^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/i

const isValidImage = function(url) {
  return url.match(rValidImage)
};

// Validation function for each step of signup process
// Values param is the form name currently being validated
// Step 0 is user profile, step 1 is dog profile
const validate = (values, step) => {
  const errors = {};
  var requiredFields = [];
  const fields = [ 'firstname', 'lastname', 'loc', 'dogname', 'dogBreed', 'dogAge' ]; //removed picLink for image uploader
  if (step === 0) {
    requiredFields = fields.slice(0, 3);
    requiredFields.forEach(field => {
      if (!values[field].value) {
      errors[field] = 'Required'
      }
    })
  } else {
    requiredFields = fields.slice(3);
    requiredFields.forEach(field => {
    if (!values[field].value) {
      errors[field] = 'Required';
    }
    })
    if (isNaN(parseInt(values.dogAge.value))) {
      errors.dogAge = 'Please enter a number'
    }
    //not need with image upload
    // if (!isValidImage(values.picLink.value)) {
    //   errors.picLink = 'Invalid Url'
    // }
  }

  return errors
}



class ProfileCreation extends React.Component {

// Keeps all user info in state
  constructor(props) {
    super(props)
    this.state = {
      finished: false,
      stepIndex: 0,
      firstname: "",
      lastname: "",
      loc: "",
      dogname: "",
      dogBreed: "",
      dogAge: "",
      picLink:"",
      rentDog: false,
      switch: false,
      errorText: {},
      data_uri:null,
      processing:false,
      filename:'',
      filetype:'',
      signedRequest: '',
      email: '',
      phone: ''

    }
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

// Waits until new user info is saved to DataBase, then pulls
// available info to pre-populate sign up form
// Currently only first and last name are available
// On every sign up
  componentDidMount() {
    setTimeout(() => {
      // User services function, searches by user ID
      findUser()
      .then((user) => {
        this.setState({"firstname": user.firstname});
        this.setState({"lastname": user.lastname})
        this.setState({"loc": user.loc || ""});
        this.setState({"dogname": user.dogname || ""});
        this.setState({"dogBreed": user.dogBreed || ""});
        this.setState({"dogAge": user.dogAge || ""});
        //removed for image uploader
        //this.setState({"picLink": user.picLink || ""});
        this.setState({"rentDog": user.rentDog || false});
        this.setState({"email": user.email || ""});
        this.setState({"phone": user.phone || ""});
      })
    }, 1000)
  }

// Updates State to match user input
  handleChange(prop, event) {
    let change = {};
    if(prop === 'rentDog'){
      console.log(this.state.switch);
      change[prop] = !this.state.switch;
    } else {
      change[prop] = event.target.value
    }
    this.setState(change);
  }
  handleSwitchChange() {
    this.setState({switch: !this.state.switch});
  };

// Does error checking on form iput, and either displays error message,
// or updates user in DB and redirects to users page after step 1 is complete
  handleSubmit() {
    var errors = {};
    if (this.state.stepIndex === 1) {
      errors = validate(dogProfile, 1);
    } else if(this.state.stepIndex === 0) {
      errors = validate(ownerProfile, 0);
    }
    if (Object.keys(errors).length === 0) {
      this.handleNext();
      if (this.state.stepIndex === 2) {

        updateUser(this.state)
          .then(function (user) {
            hashHistory.push('/users')
        });
      }
    }
    this.setState({"errorText": errors});
    console.log(this.state);
  }

// Steps to next part of sign up form
  handleNext() {
    var self = this;
    this.setState({
      stepIndex: self.state.stepIndex + 1,
      finished: self.state.stepIndex >= 2, // changed 1 to 2 added 3 view
    });
  }

// Goes backwards on sign up form
  handlePrev(){
    var self = this;
    if (this.state.stepIndex > 0) {
      this.setState({stepIndex: self.state.stepIndex - 1});
    }
  }


  handleImgUpload(file) {
    //event.preventDefault();
    const _this = this;

    this.setState({
      processing: true
    });
    console.log('filename', this.state.filename);
    console.log('filetype', this.state.filetype);
    const promise = $.ajax({
      url: '/sign-s3',
      type: "GET",
      data: {
        'file-name': file.name,
        'file-type': file.type
      },
      dataType: 'json'
    });
    promise.done(function(data){
      console.log('response data',data);
      let formData = new FormData();
      formData.append('file', file);

      var options = {
        headers: {
          'Content-Type': file.type
        }
      };

      axios.put(data.signedRequest, file, options)
      .then(function(){
        _this.setState({
          processing: false,
          uploaded_uri: data.uri,
          picLink: data.url,
          signedRequest: data.signedRequest
        });
      });

      // const promise2 = $.ajax({
      //   url: data.signedRequest,
      //   type: "PUT",
      //   data: file,
      //   dataType: 'binary/octet-stream'
      // });

      // promise2.done(function(data){
      //   _this.setState({
      //     processing: false,
      //     uploaded_uri: data.uri,
      //     picLink: data.url,
      //     signedRequest: data.signedRequest
      //   });
      // });

    });
  }
  handleFile(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    console.log('file',file);
    console.log('filename',file.name);
    this.setState({
        filename: file.name,
        filetype: file.type
    });
    // reader.onload = (upload) => {
    //   this.setState({
    //     data_uri: upload.target.result,
    //     filename: file.name,
    //     filetype: file.type
    //   });
    // };
    // This will format the data for S3 very important!!!!!!!!!!
    reader.readAsDataURL(file);
    this.handleImgUpload(file);

  }


// Material ui - info for step form with 2 steps (user info and dog info)
  getStepContent(stepIndex) {
    //Process Image
    let processing = '';
    let uploaded = '';

    if (this.state.picLink) {
      uploaded = (
        <div>
          <h4>Image uploaded!</h4>
          <Image className='imagePreview' src={this.state.picLink} />
          <pre className='image-link-box'>{this.state.picLink}</pre>
        </div>
      );
    } else {
      uploaded = '';
    }

    if (this.state.processing) {
      processing = "Processing image, hang tight";
    } else {
      processing = '';
    }

    switch (stepIndex) {
      case 0:
        return (
          <form name="ownerProfile">
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
              hintText="Email"
              floatingLabelText="Email"
              value = {this.state.email}
              onChange = {this.handleChange.bind(this, 'email')}
              name = "email"
              errorText = {this.state.errorText.email}
            /><br />
          </form>
        )
      case 1:
        return (
          <form name="dogProfile">
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
            <Toggle
            label="Rent-My-Dog"
            toggled = {this.state.rentDog}
            onClick = {this.handleSwitchChange.bind(this)}
            onToggle = {this.handleChange.bind(this, 'rentDog')}
            name = "rentDog"
            labelPosition="right"
            />
            {this.state.switch ? 'On' : 'Off'}
          </form>
        )
      case 2:
        return(
        <div className='row'>
          <div className='col-sm-12'>
            <p className='lead'>Upload your dog's picture</p>
            <RaisedButton containerElement='label' >
              <input type="file" onChange={this.handleFile.bind(this)} />
            </RaisedButton>
            <div>{processing}</div>
            <div>{uploaded}</div>
          </div>
        </div>
        )

      default:
        return '';
    }
  }

// Renders current step of form, or blank if form is complete
// and user is being redirected
  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};



    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Tell us more about you</StepLabel>
          </Step>
          <Step>
            <StepLabel>Tell us more about your best friend</StepLabel>
          </Step>
        </Stepper>
        <div >
          {finished ? ("") : (
            <div>
              <div className = "middle">{this.getStepContent(stepIndex)}</div>
              <div className ="middle" style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}  // 2 to 3 for 3rd view
                  secondary={true}
                  onTouchTap={()=>{
                    this.handleSubmit();
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

module.exports = ProfileCreation