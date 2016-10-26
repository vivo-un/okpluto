"use strict";

import React from 'react';
// import { findUser } from '../services/userServices.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import  { googleLoader } from '../utils/google.js'
import { findUser } from '../services/userServices.js'

const items = [
  <MenuItem key={1} value={'Dog Park'} primaryText="Dog Park" />,
  <MenuItem key={2} value={'Beach'} primaryText="Beach" />,
  <MenuItem key={3} value={'Trails'} primaryText="Trails" />,
  <MenuItem key={4} value={'Park'} primaryText="Park" />,
  <MenuItem key={5} value={'Something'} primaryText="Something Else" />
];


class MeetupCreation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {category: null};
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  handleTextChange(prop, event, time) {
    var newValue;
    if (event) {
      newValue = event.target.value;
    } else if (prop === "date"){
      newValue = time.toDateString();
    } else {
      newValue = time.toTimeString();
    }
    this.props.change(prop, newValue);
  }

  handleSelectionChange(prop, event, index, value) {
    this.setState({'category': value});
    this.props.change('category', value);
  }

  componentDidMount() {
    findUser(this.props.targetUser)
    .then((user) => {
      this.setState({'friendName': user.firstname});
      this.setState({'friendDogName': user.dogname});
    })
    this.loadMap();
  }

  loadMap() {
    let userLoc = {lat: this.props.lat, lng: this.props.lng}
    let options = {
      center: userLoc,
      zoom: 13,
      mapTypeId: 'roadmap'
    }
    googleLoader.then(google => {
  	  let map = new google.maps.Map(document.getElementById('map'), options);
      let marker = new google.maps.Marker({
        position: userLoc,
        map: map,
        title: "Choose a location nearby!"
      });
    })

  }

  render() {
  	const styles = {
			height: '200px',
			width: '300px'
		}
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
		    <div>
			    <TextField
			      hintText={'Park Meetup with ' + this.state.friendDogName + ' and ' + this.state.friendName}
			      floatingLabelText="Event Name"
            onChange = {this.handleTextChange.bind(this, 'eventname')}
            style={{width: 300}} />
			    <br />
			    <SelectField
			      value={this.state.category}
            onChange = {this.handleSelectionChange.bind(this, 'category')}
			      floatingLabelText="Category"
            style={{width: 300}}
			    >
            {items}
	        </SelectField>
	        <br />
			    <TextField hintText="" floatingLabelText="Where" style={{width: 300}} onChange = {this.handleTextChange.bind(this, 'loc')}/>
			    <div id="map" style={styles}></div>
			    <br />
		      <DatePicker hintText="Pick a Day" textFieldStyle={{width: 300}}
            onChange = {this.handleTextChange.bind(this, 'date')}
           />
		      <br />
		      <TimePicker hintText="Pick a Time" textFieldStyle={{width: 300}}
          onChange = {this.handleTextChange.bind(this, 'time')}
          />
		    </div>
      </MuiThemeProvider>
    )
  }
}

module.exports = MeetupCreation;