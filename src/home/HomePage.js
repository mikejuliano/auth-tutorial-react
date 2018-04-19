import React, {Component} from 'react';

export default class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.Auth = this.props.authService;

    if(!this.Auth.isAuthenticated) {
      return this.goToLogin();
    }

    this.user = this.Auth.getUser();
  }

  shouldComponentUpdate() {
    console.log('DID UPDATE');
    this.user = this.Auth.getUser();
    return true;
  }

  componentDidMount() {
    this.user = this.props.user || this.Auth.getUser();
    console.log('this.user did mount', this.user);
  }

  render() {
    const logoutButton = <button
      type="button"
      className="form-submit"
      onClick={ () => this.handleLogout() }>Logout
    </button>;

    return (
      <div>
        <h1>Home Page</h1>
        <p className="App-intro">
          { this.user ? logoutButton : null }
        </p>
        <p>
          { this.user }
        </p>
      </div>
    );
  }

  handleLogout() {
    this.Auth.logout();
    this.goToLogin();
    this.user = null;
  }

  goToLogin() {
    this.props.history.replace('/login');
  }
}