"use strict";

import React from 'react';

const Footer = (props) => (
  <footer className="primary-footer">
    <small>&copy; Ok Pluto</small>
    <nav className="nav">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Why Choose OK Pluto</a></li>
        <li><a href="#">About Us</a></li>
      </ul>
    </nav>
  </footer>
)

module.exports = Footer;

/*

.primary-footer small {
  float: left;
  font-weight: 400;
}

.primary-footer {
  background-color: #203D3B;
  color: whitesmoke;
  font-size: 14px;
  padding: 44px 15px;
}

.primary-footer a {
  color: whitesmoke;
}

.primary-footer a:hover {
  color: #70D6CF;
  text-decoration: none;
}

.nav {
  text-align: right;
}

.nav li {
  display: inline-block;
  margin: 0 10px;
  vertical-align: top;
}

.nav li:last-child {
  margin-right: 0;
}

*/