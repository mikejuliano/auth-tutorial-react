import React, {Component} from 'react';
import './Login.css';

export default class LoginPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.Auth = this.props.authService;
    if(this.Auth.isAuthenticated) {
      this.goHome();
    }
  }

  goHome() {
    this.props.history.replace('/');
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Login Page</h1>
          <form>
            <input
              className="form-item"
              placeholder="Username goes here..."
              name="username"
              type="text"
              onChange={ this.handleChange }
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
              onChange={ this.handleChange }
            />
            <button
              className="form-submit"
              value="SUBMIT"
              type="button"
              onClick={ (e) => this.handleFormSubmit(e) }>Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        this.goHome();
      })
      .catch(err => {
        console.error(err);
      });
  }
}