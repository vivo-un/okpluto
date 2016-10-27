"use strict";

var React = require('react');
var EventDisplay = require('./eventDisplay.jsx')
import Loading from './loading.jsx'

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.events.length) {
      return (
        <div className = "container userList">
          <div className = "row">
            {this.props.events.map(item =>
              <div className = "col-md-3 text-center">
                <EventDisplay event={item} />
              </div>
              )}
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

module.exports = UserList;
