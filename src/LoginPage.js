import React, {Component} from 'react';
import './Login.css';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    const {handlers} = props;
    const {attemptLogin} = handlers;

    this.handleChange = this.handleChange.bind(this);
    this.attemptLogin = attemptLogin.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  submit(e) {
    e.preventDefault();
    return this.attemptLogin(this.state.username, this.state.password);
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
              onClick={ (event) => this.submit(event) }>Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}