import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';

import 'foundation-sites/dist/css/foundation.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import App from './App';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();

