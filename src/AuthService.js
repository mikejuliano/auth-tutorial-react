const TOKEN_KEY = 'id_token';

export default class AuthService {
  isAuthenticated;
  storageService;

  constructor({storageService}) {
    this.storageService = storageService;
  }

  init() {
    return this.getTokenAsync().then(token => {
      this.isAuthenticated = !!token;
      return this.getUser(token);
    });
  }

  setTokenAsync(token) {
    this.isAuthenticated = !!token;
    this.storageService.setItem(TOKEN_KEY, token);
  }

  getTokenAsync() {
    return this.storageService.getItem(TOKEN_KEY);
  }

  logout(callback) {
    this.storageService.removeItem(TOKEN_KEY);
    this.isAuthenticated = false;
    if(callback) callback();
  }

  authenticate(username, password) {
    const url = `/api-token-auth/`;
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    };
    return this.getTokenAsync()
      .then(token => {
        const headers = this.getHeaders(token, this.isAuthenticated);
        return fetch(url, {headers, ...options}); // allows for headers override by spreading
      })
      .then(this._checkStatus) // raises an error in case response status is not a success
      .then(response => response.json())
      .then(response => {
        const token = response ? response.token : null;
        this.setTokenAsync(token);
        this.isAuthenticated = !!token;
        return this.getUser(token);
      });
  }

  getHeaders(token, isAuthenticated) {
    const headers = {'Content-Type': 'application/json'};
    if(isAuthenticated) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  _checkStatus(response) {
    if(response.status >= 200 && response.status < 300) {
      return response
    } else {
      alert('Wrong username/password');
      const error = new Error(response.statusText);
      error.response = response;
      throw error
    }
  }

  getUser(token) {
    return Promise.resolve(token ? `Hello Mike ${token}` : null); // TODO
  }
}