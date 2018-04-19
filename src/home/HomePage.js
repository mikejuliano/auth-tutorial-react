import React, {Component} from 'react';

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
    const logoutButton = <button
      type="button"
      className="form-submit"
      onClick={ () => this.handleLogout(this.props.history) }>Logout
    </button>;

    return (
      <div>
        <h1>Home Page</h1>
        <p className="App-intro">
          { this.props.user ? logoutButton : null }
        </p>
        <p>
          { this.props.user }
        </p>
      </div>
    );
  }
}