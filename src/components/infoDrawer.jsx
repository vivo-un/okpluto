import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyTheme from '../theme/theme.js';
import Drawer from 'material-ui/Drawer'
import ProfileDisplay from './profileDisplay.jsx';
import { findUser } from '../services/userServices.js'
import Loading from './loading.jsx'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'


class InfoDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.resetUserInfo = this.resetUserInfo.bind(this)
  }

  componentWillMount() {
    var self = this;
    findUser()
    .then(user => {
      if (!user) self.resetUserInfo();
      self.setState({info: user});
    })
  }

  toggleDrawer() {
    this.setState({'open': !this.state.open})
  }

  resetUserInfo() {
    var self = this;
    findUser()
    .then(user => {
      self.setState({info: user});
    })
  }

  render() {
    const iconStyle = {
      float: 'right'
    }
    if(this.state.info) {
      let children = null;
      if (this.props.children) {
        children = React.cloneElement(this.props.children, {
          auth: this.props.auth,
          userInfo: this.state.info,
          toggleDrawer: this.toggleDrawer,
          resetUserInfo: this.resetUserInfo
        })
      }
      return (
        <div>
        <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
          <Drawer open={this.state.open}>
            <div style={iconStyle} >
            <IconButton onTouchTap={this.toggleDrawer}>
              <NavigationClose />
            </IconButton>
            </div>
            <h3> Your Info </h3>
            <h3> Your Events </h3>
          </Drawer>
        </MuiThemeProvider>
        <div>
          {children}
        </div>
        </div>
      )
    } else {
      return (
        <Loading />
      )
    }
  }
}

module.exports = InfoDrawer