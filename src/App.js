import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import AuthService from './AuthService';
import StorageService from './StorageService';
import {PrivateRoute} from './PrivateRoute';

export const Loading = ({}) => <h3>Loading...</h3>;

export default class App extends Component {
  constructor() {
    super();
    this.authService = new AuthService({storageService: new StorageService()});
    this.state = {hasLoaded: false, user: null, isAuthenticated: false};
    this.init();
  }

  init() {
    this.authService.init().then(user => {
      this.setStateFromUser(user);
    });
  }

  setStateFromUser(user, cb) {
    const isAuthenticated = !!user;
    this.setState({user, isAuthenticated, hasLoaded: true}, cb);
  }

  handleLogout(history) {
    this.authService.logout();
    this.setStateFromUser(null, () => this.goToLogin(history)); // clear user, set isAuthenticated to false, go to login
  }

  goToLogin(history) {
    history.replace('/login');
  }

  attemptLogin(username, password) {
    return this.authService.authenticate(username, password)
      .then(user => this.setStateFromUser(user, () => this.goHome())) // set user, set isAuthenticated, go to home page
      .catch(err => console.error(err));
  }

  goHome() {
    window.location = '/';
  }

  render() {
    return !this.state.hasLoaded
      ? <Loading/>  //TODO loadWrapped
      : (
        <div className="App">
          <Router>
            <div>
              <PrivateRoute
                path="/" exact={ true } component={ HomePage }
                isAuthenticated={ this.state.isAuthenticated }
                user={ this.state.user }
                handlers={ {
                  logout: this.handleLogout.bind(this),
                } }
              />
              <Route
                path="/login"
                exact={ true }
                render={ (props) => (
                  <LoginPage
                    { ...props }
                    isAuthenticated={ this.state.isAuthenticated }
                    handlers={ {
                      attemptLogin: this.attemptLogin.bind(this)
                    } }
                  />
                ) }/>
            </div>
          </Router>
        </div>
      );
  }
}

