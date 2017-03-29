import Particles from 'react-particles-js';
import React, { Component } from 'react';

import '../styles/poemanalysis.css';

export default class PoemAnalysis extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    // setTimeout(() => document.body.classList.add('transition-background'), 200);
    // setTimeout(() => document.body.style.backgroundColor = 'red', 2000);
  }

  componentDidMount() {

  }

  render() {
    return (
      <Particles style={{ left: 0, position: 'fixed', scale: 1.1, top: 0 }} params={{
        particles: {
          color: {
            value: '#000'
          },
          line_linked: {
            shadow: {
              enable: true,
              color: '#fff',
              blur: 5
            }
          }
        },
        retina_detected: true
      }}/>
    );
  }
}
