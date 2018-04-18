import React, {Component} from 'react';
import AuthService from '../auth/AuthService';

export default class HomePage extends Component {

  constructor() {
    super();
    this.Auth = new AuthService();
    this.profile = this.Auth.getProfile();
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <p className="App-intro">
          <button type="button" className="form-submit" onClick={ this.handleLogout.bind(this) }>Logout</button>
        </p>
        <p>
          { this.profile }
        </p>
      </div>
    );
  }

  handleLogout() {
    this.Auth.logout();
    this.props.history.replace('/login');
  }
}

