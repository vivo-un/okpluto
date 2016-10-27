import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import Drawer from 'material-ui/Drawer'
import ProfileDisplay from './profileDisplay.jsx';
import { findUser } from '../services/userServices.js'


class InfoDrawer extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    if (this.props.user._id) {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
        <Drawer open={this.props.open}>
          <h4> Hide </h4>
          <h3> Your Info </h3>
          <h3> Your Events </h3>
        </Drawer>
      </MuiThemeProvider>
    )
    } else{
      return (<div></div>)
    }
  }
}

module.exports = InfoDrawer