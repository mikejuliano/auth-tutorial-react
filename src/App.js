import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import HomePage from './home/HomePage';
import LoginPage from './auth/LoginPage';
import AuthService from './auth/AuthService';

const authService = new AuthService();

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" exact={ true } render={ (props) => (
              <HomePage authService={ authService } { ...props }/>
            ) }/>
            <Route path="/login" render={ (props) => (
              <LoginPage authService={ authService } { ...props }/>
            ) }/>
          </div>
        </Router>
      </div>
    );
  }
}
