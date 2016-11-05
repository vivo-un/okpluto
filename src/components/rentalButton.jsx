/*
  CURRENTLY NOT USED BUTTON
  This file contains the component for the RentalButton! Used within rental.jsx
*/

import React from 'react'
import RentalDialog from './RentalDialog.jsx'

class RentalButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RentalDialog userId={this.props.userId} lat={this.props.lat} lng={this.props.lng} userInfo={this.props.userInfo} resetUserInfo={this.props.resetUserInfo}
      />
    )
  }
}

module.exports = RentalButton;