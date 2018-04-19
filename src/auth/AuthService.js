export default class AuthService {
  isAuthenticated;

  constructor() {
    this.isAuthenticated = !!this.getToken();
  }

  authenticate(username, password) {
    const url = `/accounts/get_auth_token/`;
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    };
    return this.fetch(url, options)
      .then(res => {
        const token = res ? res.token : null;
        this.setToken(token);
        this.isAuthenticated = !!token;
        return res;
      });
  }

  setToken(token) {
    localStorage.setItem('id_token', token);
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
    const headers = this.getHeaders(this.getToken());
    return fetch(url, {headers, ...options}) // allows for headers override by spreading
      .then(this._checkStatus)
      .then(response => response.json());
  }

  getHeaders(token) {
    const headers = {'Content-Type': 'application/json'};
    if(this.isAuthenticated) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
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