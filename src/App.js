import React, {Component} from 'react';

import './App.css';
import 'foundation-sites/dist/css/foundation.css';
import withAuth from './auth/withAuth';
import HomePage from './home/HomePage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomePage { ...this.props }/>
      </div>
    );
  }

}

export default withAuth(App);
