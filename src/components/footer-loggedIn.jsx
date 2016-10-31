"use strict";

import React from 'react';
import { hashHistory } from 'react-router';

const FooterLoggedIn = (props) => (
  <footer className="primary-footer">
    <small>&copy; Ok Pluto</small>
    <nav className="nav">
      <ul>
        <li><a onClick={() => hashHistory.push('/users')}>Users</a></li>
        <li><a onClick={() => hashHistory.push('/events')}>Events</a></li>
        <li><a onClick={() => hashHistory.push('/profile')}>Profile</a></li>
      </ul>
    </nav>
  </footer>
)

module.exports = FooterLoggedIn;