'use strict';

var React = require('react');
var Navigation = require('./nav.jsx');
import { findUser, updateUser } from '../services/userServices.js'

//EXAMPLE USAGE:
// findUser()
  // .then(user => {
  //   console.log(user)
  // });

//Property names in object passed to this function must match property names in mongo user schema
  // updateUser({dogname: 'sparky', dogBreed: 'mix', dogAge: 7})
  // .then(updateUser => {
  //   console.log(updateUser)
  // })

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