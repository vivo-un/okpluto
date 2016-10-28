import React from 'react'
import MeetupDialog from './meetupDialog.jsx'
import ProfileEditDialog from './profileEditDialog.jsx'

class DialogButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.type === 'user') {
      return (<MeetupDialog userId={this.props.userId} lat={this.props.lat} lng={this.props.lng} userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo} />)
    } else if (this.props.type === 'profile') {
      return (<ProfileEditDialog userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo} />)
    }
  }
}

module.exports = DialogButton;