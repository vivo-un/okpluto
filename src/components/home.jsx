'use strict';
import React, { PropTypes as T } from 'react';
import AuthService from '../utils/AuthService.jsx';
import Navigation from './nav.jsx';
import Auth0Lock from '../../node_modules/auth0-lock';
import Footer from './footer.jsx';
const House = '/assets/house.png';
const Connect = '/assets/connect.png';
const MeetUp = '/assets/meetUp.png';
const Daisy = '/assets/daisy.png';
const Kat = '/assets/kat.png';
const Jarrett = '/assets/jarrett.png';
const Ivey = '/assets/ivey.png';
const rent = '/assets/rent.png';

// Stateless Components

// component that will show clickable site features for visitors
class IconItem extends React.Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (
      <div className='col-md-3'>
        <a href={this.props.link} onClick={this.props.onTouchTap}>
          <img src={this.props.url} className='img-circle'/>
        </a>
        <h2>{this.props.display}</h2>
        <p>{this.props.info}</p>
      </div>
    );
  };
};

// component that displays the development team and links to their github page
class TeamIcon extends React.Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (
      <div className='col-md-3' >
        <a href={this.props.link}>
          <img src={this.props.url} className='img-circle'/>
        </a>
        <h3>{this.props.display}</h3>
      </div>
    );
  };
};

// component for the home page
class Home extends React.Component {

  render () {
    return (
      <div>
        <Navigation auth={this.props.auth}/>
        <div className='jumbotron main-image' >
          <div className='container'>
            <h1>Ok Pluto</h1>
            <h2>Online playground</h2>
            <h2>for your best friend</h2>
          </div>
        </div>

        <div className='row section-heading'>
          <p>Get to know fellow dog owners in your area</p>
        </div>

        <div className='container icons'>
          <div className='row'>
            <IconItem
              url={Connect}
              display={'CONNECT'}
              info={'OkPluto instantly puts you in touch with other dog lovers from around the world'}
              link={'https://evening-bayou-76161.herokuapp.com/#/users'}
            />
            <IconItem
              url={MeetUp}
              display={'MEET UP'}
              info={'We make it easy for you to set up walks and dog park meet ups with other local dog owners'}
              link={'https://evening-bayou-76161.herokuapp.com/#/events'}
            />
            <IconItem
              url={House}
              display={'ADOPT A DOG'}
              info={'Don\'t have a dog? No worries! Adopt your new best friend at a shelter near you!'}
              link={'https://www.petfinder.com/animal-shelters-and-rescues/search'}
            />
            <IconItem
              url={rent}
              display={'RENT A DOG'}
              info={'Too busy to own your own dog? Check out some local dogs available for rent!'}
              link={'https://evening-bayou-76161.herokuapp.com/#/rental'}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  };
};

// for debugging/developing
Home.propTypes = {
  location: T.object,
  auth: T.instanceOf(AuthService)
};

module.exports = Home;
