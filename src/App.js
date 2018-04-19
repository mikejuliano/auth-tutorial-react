import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import './App.css';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import AuthService from './AuthService';
import StorageService from './StorageService';
import {PrivateRoute} from './PrivateRoute';
import {PublicRoute} from './PublicRoute';
import {LoadingWrapper} from './LoadingWrapper';
import {LogoutButton} from './LogoutButton';

export default class App extends Component {
  constructor() {
    super();
    this.authService = new AuthService({storageService: new StorageService()});
    this.state = {hasLoaded: false, user: null, isAuthenticated: false};
    this.init();
  }

  init() {
    this.authService.init().then(user => {
      this.setUser(user);
    });
  }

  setUser(user, cb) {
    const isAuthenticated = !!user;
    this.setState({user, isAuthenticated, hasLoaded: true}, cb);
  }

  logout(history) {
    this.authService.logout();
    this.setUser(null, () => this.goToLogin(history)); // clear user, set isAuthenticated to false, go to login
  }

  goToLogin(history) {
    history.replace('/login');
  }

  attemptLogin(username, password) {
    return this.authService.authenticate(username, password)
      .then(user => this.setUser(user, () => this.goHome())) // set user, set isAuthenticated, go to home page
      .catch(err => console.error(err));
  }

  goHome() {
    window.location = '/';
  }

  render() {
    return (
      <LoadingWrapper isLoading={ !this.state.hasLoaded }>
        <div className="App">
          <Router>
            <div>
              <LogoutButton
                isAuthenticated={ this.state.isAuthenticated }
                handleLogout={ this.logout.bind(this) }
              />
              <PrivateRoute
                path="/" exact={ true } component={ HomePage }
                isAuthenticated={ this.state.isAuthenticated }
                user={ this.state.user }
              />
              <PublicRoute
                path="/login" exact={ true } component={ LoginPage }
                handlers={ {
                  attemptLogin: this.attemptLogin.bind(this)
                } }
              />
            </div>
          </Router>
        </div>
      </LoadingWrapper>
    )
  }
}

