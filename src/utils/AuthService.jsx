"use strict";

import Auth0Lock from 'auth0-lock';
import { hashHistory } from 'react-router'
const Logo = '/assets/logo.png';

export default class AuthService {
  constructor(clientId, domain) {
    //Set custom signup fields
    var options = {
      additionalSignUpFields: [{
        name: "given_name",
        placeholder: "First Name",
        validator: function(name) {
          return {
            valid: name.length >= 2
          }
        }
      },
      {
        name: "family_name",
        placeholder: "Last Name",
        validator: function(name) {
          return {
            valid: name.length >= 2
          }
        }
      }],

      languageDictionary: {
        title: "Ok Pluto"
      },

      theme: {
        logo: Logo,
        primaryColor: '#203D3B'
      }
    }

    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, options)
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult){
    //clear local storage
    this.logout();
    // Saves the user token
    this.setToken(authResult.idToken)
    //Redirect to users after login
    hashHistory.push('/users')
    //Save user in site DB, or create in site DB
    this.saveUser()
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_tokenx537?', idToken)
  }

  setDBId(id) {
    // Saves mongoDB user id to localStorage
    localStorage.setItem('mongoUserId', id);
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_tokenx537?')
  }

  getDBId(){
    // Retrieves the mongoDB user token from localStorage
    return localStorage.getItem('mongoUserId')
  }

  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_tokenx537?');
    localStorage.removeItem('mongoUserId')
  }
  //POST to API to get mongoDB user info
  saveUser() {
    var idToken = this.getToken();
    $.ajax({
      url: '/signin',
      type: 'POST',
      data: {id: idToken},
      success: data => {
      //set DB ID into localstorage
        this.setDBId(data._id);
      }
    })
  }
}