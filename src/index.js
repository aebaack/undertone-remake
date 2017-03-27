import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router, 
  Route
} from 'react-router-dom';
import Homepage from './components/HomePage';
import PoemList from './components/PoemList';

class Index extends Component {
  componentWillMount() {
    document.body.style.backgroundColor = determineBackgroundColor();
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Homepage} />
          <Route path='/poet/:poet' component={PoemList} />
          {/*<Route path='/poet/:poet/poem/:poem' component={PoemAnalysis} />*/}
        </div>
      </Router>
    );
  }
}

function determineBackgroundColor() {
  const backgroundColors = [
    '#1976D2', // blue
    '#EF6C00', // orange
    '#7E57C2', // purple
    '#00897B' // teal
  ];
  return backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
