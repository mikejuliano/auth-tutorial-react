import React, {Component} from 'react';
import {LogoutButton} from '../auth/LogoutButton';

export default class HomePage extends Component {
  componentDidMount() {
    const {isAuthenticated, user, handlers, history} = this.props;
    const {logout, goToLogin} = handlers;
    if(!isAuthenticated) {
      return goToLogin(history);
    }
    this.handleLogout = logout;
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <LogoutButton
          isAuthenticated={ this.props.isAuthenticated }
          handleLogout={ (history) => this.handleLogout(history) }
        />
        <p>
          { this.props.user }
        </p>
      </div>
    );
  }
}