"use strict";

import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button, Jumbotron} from 'react-bootstrap';
import AuthService from '../utils/AuthService.jsx';
import Navigation from './nav.jsx';
import Auth0Lock from '../../node_modules/auth0-lock';
const House = '/assets/house.png';
const Connect = '/assets/connect.png';
const MeetUp = '/assets/meetUp.png';
const Daisy = '/assets/daisy.png';
const Kat = '/assets/kat.png';
const Jarrett = '/assets/jarrett.png';
const Ivey = '/assets/ivey.png';

class IconItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-md-4">
        <img src={this.props.url} className="img-circle"/>
        <h2>{this.props.display}</h2>
        <p>{this.props.info}</p>
        <a href={this.props.link}>{this.props.linkInfo}</a>
      </div>
    )
  }
}

class TeamIcon extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="col-md-3">
        <img src={this.props.url} className="img-circle"/>
        <h3>{this.props.display}</h3>
      </div>
    )
  }
}

class Home extends React.Component {

  render () {
    return (
      <div>
        <Navigation auth={this.props.auth}/>
        <div className="jumbotron main-image" >
          <div className="container">
            <h1>Ok Pluto</h1>
            <h2>Online playground for your best friend</h2>
          </div>
        </div>

        <div className="row section-heading">
          <p>Get to know fellow dog owners in your area</p>
        </div>

        <div className="container icons">
          <div className="row">
            <IconItem url={Connect} display={"CONNECT"} info={"OkPluto instantly puts you in touch with other dog lovers from around the world"}/>
            <IconItem url={MeetUp} display={"MEET UP"} info={"We make it easy for you to set up walks and dog park meet ups with other local dog owners"}/>
            <IconItem url={House} display={"ADOPT A DOG"} info={"Don't have a dog? No worries! Adopt your new best friend at a shelter near you!"} link={"https://www.petfinder.com/animal-shelters-and-rescues/search"} linkInfo={"Find a Shelter"}/>
          </div>
        </div>

        <div className="row section-heading alt">
          <p>Our Development Team</p>
        </div>

        <div className="team">
          <div className="row">
            <TeamIcon url={Daisy} display={"Daisy Good"} />
            <TeamIcon url={Kat} display={"Kat Gurdak"} />
            <TeamIcon url={Jarrett} display={"Jarrett Kennedy"} />
            <TeamIcon url={Ivey} display={"Ivey Topaz"} />
          </div>
        </div>
      </div>

    )
  }

}

Home.propTypes = {
  location: T.object,
  auth: T.instanceOf(AuthService)
};

// <IconItem url={House} display={"DOG SIT"} info = {"Find trusted dog sitters in your area, or arrange for your OkPluto friends to watch your dogs while you're away"}/>

module.exports = Home;
