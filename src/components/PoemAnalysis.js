import axios from 'axios';
import Particles from 'react-particles-js';
import React, { Component } from 'react';

import '../styles/poemanalysis.css';

export default class PoemAnalysis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayError: false,
      poem: [],
      poemAnalysis: []
    };
  }

  componentWillMount() {
    axios.get(`https://poetdb.herokuapp.com/title,author/${this.props.match.params.poem};${this.props.match.params.poet}`)
      .then(poem => {
        const formattedPoem = this.formatPoemForWatsonAnalysis(poem.data[0].lines);
        this.setState({ poem: formattedPoem[0] })
        // axios.post('https://undertone-watson.herokuapp.com/', {text: formattedPoem[1]})
        //   .then(watsonAnalysis => this.setState({ poemAnalysis:  }))
        //   .catch(err => this.setState({ displayError: true }));
      })
      .catch(err => this.setState({ poems: [] }));
    // setTimeout(() => document.body.classList.add('transition-background'), 200);
    // setTimeout(() => document.body.style.backgroundColor = 'red', 2000);
  }

  componentDidMount() {
    // setTimeout(() => document.body.classList.add('transition-background'), 200);
    // setTimeout(() => document.body.style.backgroundColor = 'red', 2000);
  }

  formatPoemForWatsonAnalysis(poemLines) {
    const stanzasHTMLArr = [];
    let currentStanzaHTML = '';
    let watsonFormatted = '';

    poemLines.forEach(line => {
      if (line === '' && currentStanzaHTML !== '') {
        stanzasHTMLArr.push(currentStanzaHTML.trim());
        watsonFormatted += '. ';
        currentStanzaHTML = '';
      } else {
        currentStanzaHTML += line + '<br>';
        watsonFormatted += line.replace(/[!.?]/g, ' ');
      }
    });

    stanzasHTMLArr.push(currentStanzaHTML);
    watsonFormatted += '.';

    return [stanzasHTMLArr, watsonFormatted];
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
