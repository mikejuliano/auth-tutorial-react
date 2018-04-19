import React, {Component} from 'react';

export default class HomePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.authService = this.props.authService;

    if(!this.authService.isAuthenticated) {
      return this.goToLogin();
    }

    this.user = this.authService.getUser();
  }

  shouldComponentUpdate() {
    console.log('DID UPDATE');
    this.user = this.authService.getUser();
    return true;
  }

  componentDidMount() {
    this.user = this.props.user || this.authService.getUser();
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
    this.authService.logout();
    this.goToLogin();
    this.user = null;
  }

  goToLogin() {
    this.props.history.replace('/login');
  }
}