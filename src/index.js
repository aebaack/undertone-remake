import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router, 
  Route
} from 'react-router-dom';

import HomePage from './components/HomePage';
import Notice from './components/Notice';
import PoemAnalysis from './components/PoemAnalysis';
import PoemList from './components/PoemList';

import { determineBackgroundColor } from './scripts/backgroundColor';

class Index extends Component {
  // Select a semi-random background color for the page
  componentWillMount() {
    determineBackgroundColor()
  }

  // Render router component
  render() {
    return (
      <Router>
        <div>
          <Notice />
          <Route exact path='/' component={HomePage} />
          <Route exact path='/poet/:poet/poem/:poem' component={PoemAnalysis} />
          <Route exact path='/poet/:poet' component={PoemList} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
