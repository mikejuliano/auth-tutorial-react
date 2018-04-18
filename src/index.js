import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import App from './App';
import LoginPage from './auth/LoginPage';

ReactDOM.render((
  <Router>
    <div>
      <Route path='/' component={ App }/>
      <Route path='/login' exact={ true } strict={ false } component={ LoginPage }/>
    </div>
  </Router>
), document.getElementById('root'));
registerServiceWorker();

