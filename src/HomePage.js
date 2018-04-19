import React, {Component} from 'react';
import {LogoutButton} from './LogoutButton';

export default class HomePage extends Component {
  render() {
    const {isAuthenticated, user, handlers} = this.props;
    const {logout} = handlers;

    return (
      <div>
        <h1>Home Page</h1>
        <LogoutButton
          isAuthenticated={ isAuthenticated }
          handleLogout={ (history) => logout(history) }
        />
        <p>{ user }</p>
      </div>
    );
  }
}