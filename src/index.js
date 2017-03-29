import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router, 
  Route
} from 'react-router-dom';

import HomePage from './components/HomePage';
import PoemAnalysis from './components/PoemAnalysis';
import PoemList from './components/PoemList';

class Index extends Component {
  // Select a semi-random background color for the page
  componentWillMount() {
    document.body.style.backgroundColor = this.determineBackgroundColor();
  }

  determineBackgroundColor() {
    const backgroundColors = [
      '#1976D2', // blue
      '#EF6C00', // orange
      '#7E57C2', // purple
      '#00897B' // teal
    ];
    return backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  }

  // Render router component
  render() {
    return (
      <Router>
        <div>
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
