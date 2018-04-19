export default class AuthService {
  isAuthenticated;

  constructor() {
    this.isAuthenticated = !!this.getToken();
  }

  login(username, password) {
    return this.fetch(`/accounts/get_auth_token/`, {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'}
    }).then(res => {
      console.log('res', res);
      this.setToken(res.token);
      return res;
    })
  }

  setToken(token) {
    localStorage.setItem('id_token', token);
    this.isAuthenticated = !!token;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('id_token');
    this.isAuthenticated = false;
  }

  getUser() {
    return this.getToken();
  }

  fetch(url, options) {
    const headers = {'Content-Type': 'application/json'};
    /*if(this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }*/
    return fetch(url, {headers, ...options})
      .then(this._checkStatus)
      .then(response => response.json())
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if(response.status >= 200 && response.status < 300) {
      return response
    } else {
      alert('Wrong username/password');
      const error = new Error(response.statusText);
      error.response = response;
      throw error
    }
  }
}