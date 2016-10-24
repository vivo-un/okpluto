'use strict';

var React = require('react');
var Navigation = require('./nav.jsx');
import { findUser } from '../services/userServices.js'

//EXAMPLE USAGE:
// findUser()
  // .then(user => {
  //   console.log(user)
  // });
class Profile extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    console.log(this.props.route)
    return (
      <div className='container'>
        <div className='jumbotron'>
            <div>
            <br></br>
            <div className="well">
              <div className="page-header">
                <label>username</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Profile;