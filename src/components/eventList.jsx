"use strict";

var React = require('react');
var EventDisplay = require('./eventDisplay.jsx')
import Loading from './loading.jsx'

const Row = (props) => (
  <div className="row">
    {
      props.row.map((event) => (
        <div className= "col-md-3 text-center">
          <EventDisplay event={event} type='user' />
        </div>
      ))
    }
  </div>
)

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    if (this.props.events.length) {
      var events = this.props.events;
      var rows = [];
      var row = [];
      for (var i = 0; i < events.length; i++) {
        if (i % 3 === 0 && row.length > 0) {
          rows.push(row);
          row = [];
        }
        row.push(events[i]);
        if (i === events.length - 1 && row.length > 0) {
          rows.push(row);
        }
      }
      return (
        <div className = "container userList">
          {
            rows.map(row => (
              <Row row={row} />
            ))
          }
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
