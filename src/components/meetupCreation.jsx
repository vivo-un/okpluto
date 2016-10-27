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

	  let map = new google.maps.Map(document.getElementById('map'), options);

  //  var map = new google.maps.Map(document.getElementById('map'), {
  //   // 34.4358° N, 119.8276° W
  //   center: {lat: 34.4358, lng: -119.8276},
  //   zoom: 13,
  //   mapTypeId: 'roadmap'
  // });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    console.log('listener called')
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
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
			    <input id="pac-input" className="controls" style={{width: 300}} onChange = {this.handleTextChange.bind(this, 'loc')}/>

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