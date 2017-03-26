import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Homepage from './components/homepage';
import './styles/index.css';

class Index extends Component {
  componentWillMount() {
    document.body.style.backgroundColor = determineBackgroundColor();
  }

  render() {
    return (
      <Homepage />
    );
  }
}

function determineBackgroundColor() {
  const backgroundColors = [
    '#1976D2', // blue
    '#C62828', // red
    '#7E57C2', // purple
    '#00897B' // teal
  ];
  return backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
