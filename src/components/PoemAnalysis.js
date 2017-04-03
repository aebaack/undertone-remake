import axios from 'axios';
import React, { Component } from 'react';
import Particles from 'react-particles-js';
import { Link } from 'react-router-dom';

import { returnParticleConfiguration } from '../scripts/particleConfiguration';
import '../styles/poemanalysis.css';

export default class PoemAnalysis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStanza: 0, // Current location in the poem array
      displayError: false, // Display an error if true
      documentTone: '', // Tone of the entire poem
      poem: [], // Formatted array of poem stanzas
      poemAnalysis: [] // Watson poem analysis
    };

    this.determineBackgroundColor = this.determineBackgroundColor.bind(this);
    this.keyboardNavigation = this.keyboardNavigation.bind(this);
    this.returnNavArrowJSX = this.returnNavArrowJSX.bind(this);
    this.returnParticleJSX = this.returnParticleJSX.bind(this);
    this.switchStanza = this.switchStanza.bind(this);
  }

  // Add arrow key event for switching between stanzas
  // Grab poem from poetryDB and send to IBM Watson API for tone analysis
  componentWillMount() {
    document.body.addEventListener('keydown', this.keyboardNavigation);

    axios.get(`https://poetdb.herokuapp.com/title,author/${this.props.match.params.poem};${this.props.match.params.poet}`)
      .then(poem => {

        const formattedPoem = this.formatPoemForWatsonAnalysis(poem.data[0].lines);
        this.setState({ poem: formattedPoem[0] });

        axios.post('https://undertone-watson.herokuapp.com/', { text: formattedPoem[1] })
          .then(watsonAnalysis => {

            this.setState({
              documentTone: this.determineMainTone(watsonAnalysis.data.document_tone.tone_categories[0].tones),
              poemAnalysis: watsonAnalysis.data.sentences_tone 
            });
          })
          .catch(err => this.setState({ displayError: true }));
      })
      .catch(err => this.setState({ displayError: true }));
  }

  // Add background color transition class to body
  componentDidMount() {
    setTimeout(() => document.body.classList.add('transition-background'), 100);
  }

  // Remove keyboard navigation
  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.keyboardNavigation);
  }

  // Capitalize the first letter of the string
  capitalizeFirstLetter(str) {
    if (typeof str === 'string' && str.length > 0) {
      return str.charAt().toUpperCase() + str.substr(1);
    }
  }

  // Determine the new background color based on the current stanza tone
  determineBackgroundColor() {
    switch(this.returnCurrentStanzaTone()) {
      case 'anger': // red
        return '#C62828';
      case 'disgust': // green
        return '#827717';
      case 'joy': // orange
        return '#F9A825';
      case 'sadness': // blue
        return '#1A237E';
      case 'fear': // gray
        return '#263238';
      default: // blue
        return '#00838F';
    }
  }

  // Determine the main tone given Watson tone array
  determineMainTone(toneArray) {
    return toneArray
      .reduce((mainTone, currentTone) => {
        if (currentTone.score > mainTone[0]) {
          [mainTone[0], mainTone[1]] = [currentTone.score, currentTone.tone_id];
        }
        return mainTone;
      }, [0, ''])[1];
  }

  // Format poem data for analysis by Watson
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
        currentStanzaHTML += line + '\n';
        watsonFormatted += line.replace(/[!.?]/g, ' ');
      }
    });

    stanzasHTMLArr.push(currentStanzaHTML);
    watsonFormatted += '.';

    return [stanzasHTMLArr, watsonFormatted];
  }

  keyboardNavigation(event) {
    if (event.code === 'ArrowLeft') {
      this.switchStanza('l');
    } else if (event.code === 'ArrowRight') {
      this.switchStanza('r');
    }
  }

  // Return the current tone of the stanza displayed on screen
  returnCurrentStanzaTone() {
    if (this.state.poemAnalysis && this.state.poemAnalysis.length !== 0) {
      const currentToneArr = this.state.poemAnalysis[this.state.currentStanza]
        .tone_categories[0].tones;
      return this.determineMainTone(currentToneArr);
    }
  }

  // Return left and right navigation arrow JSX
  returnNavArrowJSX(direction) {
    const arrowElement = <i
        className={`material-icons nav-arrow arrow-${direction}`}
        onClick={() => this.switchStanza(direction.charAt())}
      >{`chevron_${direction}`}</i>;

    const arrowDisplayCondition = direction === 'left' ?
      this.state.currentStanza !== 0 :
      this.state.currentStanza !== this.state.poem.length - 1;

    return arrowDisplayCondition ? arrowElement : <div />
  }

  // Return JSX for the particles in the background
  returnParticleJSX() {
    if (this.state.poemAnalysis && this.state.poemAnalysis.length !== 0) {
      document.body.style.backgroundColor = this.determineBackgroundColor();
    }

    const particleConfiguration = returnParticleConfiguration();
    particleConfiguration.retina_detected = true;
    return (
      <Particles 
        style={{ 
          left: 0, 
          position: 'fixed', 
          // transform: 'scale(1.1)', add this to remove clipping effect with bubble particles
          top: 0
        }} 
        params={particleConfiguration}
      />
    );
  }

  // Switch the currently displayed stanza
  switchStanza(direction) {
    if (direction === 'l' && this.state.currentStanza > 0) {
      this.setState({ currentStanza: this.state.currentStanza - 1 });
    } else if (direction === 'r' && this.state.currentStanza < this.state.poem.length - 1){
      this.setState({ currentStanza: this.state.currentStanza + 1 });
    }
  }

  // Render poem stanza-by-stanza with tone analysis data
  render() {
    return this.state.documentTone !== '' ?
      <div> 
        {/* Particles */}
        {this.returnParticleJSX()}

        {/* Navigation */}
        {this.returnNavArrowJSX('left')}
        {this.returnNavArrowJSX('right')}
        <Link to={`/poet/${this.props.match.params.poet}`}>
          <i className="material-icons close-button">close</i>
        </Link>

        {/* Upper Right Tone Data */}
        <div className="tone-data">
          Overall: {this.capitalizeFirstLetter(this.state.documentTone)}
          <br />
          Stanza: {this.capitalizeFirstLetter(this.returnCurrentStanzaTone())}
        </div>

        {/* Poem Stanzas */}
        <div className="animated two-second stanza">
          <div className="title-description">
            {this.props.match.params.poem}<br />
            <div className="poet">{this.props.match.params.poet}</div>
            <br />
          </div>
          <p>{this.state.poem[this.state.currentStanza]}</p>
        </div>
      </div> :
      // Loading Animation
      <div className="animated spinner-center">
        {!this.state.displayError ? 
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div> :
          <div style={{ textAlign: 'center' }}>
            <Link className="poem-error" to={`/poet/${this.props.match.params.poet}`}>
              An Error Occured — Press Here to Go Back and Select a Different Poem
            </Link>
          </div>}
      </div>;
  }
}
