'use strict';

var React = require('react');
var Navigation = require('./nav.jsx');

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