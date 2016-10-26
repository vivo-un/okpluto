import React from 'react'
import MeetupDialog from './meetupDialog.jsx'
import ProfileEditDialog from './profileEditDialog.jsx'

class DialogButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.type === 'user') {
      return (<MeetupDialog userId={this.props.userId} lat={this.props.lat} lng={this.props.lng}/>)
    } else if (this.props.type === 'profile') {
      return (<ProfileEditDialog />)
    }
  }
}

module.exports = DialogButton;