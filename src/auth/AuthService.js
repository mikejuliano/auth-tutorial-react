//import decode from 'jwt-decode';

export default class AuthService {
  // Initializing important variables
  constructor() {
    //this.domain = domain || 'http://localhost:8080'; // API server domain
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(username, password) {
    // Get a token from api server using the fetch api
    return this.fetch(`/accounts/get_auth_token/`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log('res', res);
      this.setToken(res.token); // Setting the token in localStorage
      return res;
    })
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage
    return !!token && !this.isTokenExpired(token) // hand waiving here
  }

  isTokenExpired(token) {
    /*try {
      const decoded = decode(token);
      if(decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
        return true;
      }
      else {
        return false;
      }
    }
    catch(err) {
      return false;
    }*/
    return false;
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    //return decode(this.getToken());
    const token = this.getToken();
    const profile = token ? `MIKE's PROFILE` : null;
    console.log('profile', profile);
    return profile;
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      //'Content-Type': 'application/json',
      //'Access-Control-Allow-Origin': '*'
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if(this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json())
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if(response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response
    } else {
      const error = new Error(response.statusText);
      error.response = response;
      throw error
    }
  }
}