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
import api from '../../config/api.js';
import GoogleMapsLoader from 'google-maps';
import { findUser } from '../services/userServices.js'

const items = [
  <MenuItem key={1} value={1} primaryText="Dog Park" />,
  <MenuItem key={2} value={2} primaryText="Beach" />,
  <MenuItem key={3} value={3} primaryText="Trails" />,
  <MenuItem key={4} value={4} primaryText="Park" />,
  <MenuItem key={5} value={5} primaryText="Something Else" />
];

GoogleMapsLoader.KEY = api.API_KEY;

class MeetupCreation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: null};
    this.handleChange = (event, index, value) => this.setState({value});
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
		GoogleMapsLoader.load(function(google) {
		  let map = new google.maps.Map(document.getElementById('map'), options);
      let marker = new google.maps.Marker({
        position: userLoc,
        map: map,
        title: "Choose a location nearby!"
      });
		});
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
            style={{width: 300}} />
			    <br />
			    <SelectField
			      value={this.state.value}
			      onChange={this.handleChange}
			      floatingLabelText="Category"
            style={{width: 300}}
			    >
            {items}
	        </SelectField>
	        <br />
			    <TextField hintText="" floatingLabelText="Where" style={{width: 300}} />
			    <div id="map" style={styles}></div>
			    <br />
		      <DatePicker hintText="Pick a Day" textFieldStyle={{width: 300}} />
		      <br />
		      <TimePicker hintText="Pick a Time" textFieldStyle={{width: 300}} />
		    </div>
      </MuiThemeProvider>
    )
  }
}

module.exports = MeetupCreation;