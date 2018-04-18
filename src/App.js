import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Column, Container, Row} from './common/ui';

import './App.css';
import {HomePage} from './home/HomePage';
import 'foundation-sites/dist/css/foundation.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container inactive={ true }>
          <Row>
            <Column medium={ 12 }>
              <Router>
                <div>
                  <Route path='/' exact={ true } strict={ false } component={ HomePage }/>
                </div>
              </Router>
            </Column>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
