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

const items = [
  <MenuItem value={1} primaryText="Dog Park" />,
  <MenuItem value={2} primaryText="Beach" />,
  <MenuItem value={3} primaryText="Trails" />,
  <MenuItem value={4} primaryText="Park" />,
  <MenuItem value={5} primaryText="Something Else" />
];

class MeetupCreation extends React.Component {
	constructor(props) {
    super(props)
    this.state = {value: null};
  }

  handleChange(event, index, value) {
  	this.setState({value});
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
		    <div>
			    <TextField
			      hintText="Park Meetup with Violet"
			      floatingLabelText="Event Name" />
			    <br />
			    <SelectField
			      value={this.state.value}
			      onChange={this.handleChange}
			      floatingLabelText="Category"
			    >
            {items}
	        </SelectField>
	        <br />
			    <TextField hintText="" floatingLabelText="Where" />
			    <div id="map"></div>
			    <br />
		      <DatePicker hintText="Pick a Day" />
		      <TimePicker hintText="Pick a Time" />
		    </div>
      </MuiThemeProvider>
    )
  }
}

module.exports = MeetupCreation;