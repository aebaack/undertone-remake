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
      currentStanza: 0,
      displayError: false,
      documentTone: '',
      poem: [],
      poemAnalysis: []
    };

    this.determineBackgroundColor = this.determineBackgroundColor.bind(this);
    this.returnParticleJSX = this.returnParticleJSX.bind(this);
    this.switchStanza = this.switchStanza.bind(this);
  }

  componentWillMount() {
    axios.get(`https://poetdb.herokuapp.com/title,author/${this.props.match.params.poem};${this.props.match.params.poet}`)
      .then(poem => {
        const formattedPoem = this.formatPoemForWatsonAnalysis(poem.data[0].lines);
        this.setState({ poem: formattedPoem[0] });
        axios.post('https://undertone-watson.herokuapp.com/', {text: formattedPoem[1]})
          .then(watsonAnalysis => {
            this.setState({
              documentTone: this.determineMainTone(watsonAnalysis.data.document_tone.tone_categories[0].tones),
              poemAnalysis: watsonAnalysis.data.sentences_tone 
            });
          })
          .catch(err => this.setState({ displayError: true }));
        // this.setState({ documentTone: 'anger' })
      })
      .catch(err => this.setState({ poems: [] }));
  }

  componentDidMount() {
    setTimeout(() => document.body.classList.add('transition-background'), 100);
  }

  capitalizeFirstLetter(str) {
    if (typeof str === 'string' && str.length > 0) {
      return str.charAt().toUpperCase() + str.substr(1);
    }
  }

  determineBackgroundColor() {
    switch(this.returnCurrentStanzaTone()) {
      case 'anger':
        return '#C62828';
      case 'disgust':
        return '#827717';
      case 'joy':
        return '#F9A825';
      case 'sadness':
        return '#1A237E';
      case 'fear':
        return '#263238';
      default:
        return '#00838F';
    }
  }

  determineMainTone(toneArray) {
    return toneArray
      .reduce((mainTone, currentTone) => {
        if (currentTone.score > mainTone[0]) {
          [mainTone[0], mainTone[1]] = [currentTone.score, currentTone.tone_id];
        }
        return mainTone;
      }, [0, ''])[1];
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
        currentStanzaHTML += line + '\n';
        watsonFormatted += line.replace(/[!.?]/g, ' ');
      }
    });

    stanzasHTMLArr.push(currentStanzaHTML);
    watsonFormatted += '.';

    return [stanzasHTMLArr, watsonFormatted];
  }

  returnCurrentStanzaTone() {
    if (this.state.poemAnalysis.length !== 0) {
      const currentToneArr = this.state.poemAnalysis[this.state.currentStanza]
        .tone_categories[0].tones;
      return this.determineMainTone(currentToneArr);
    }
  }

  returnParticleJSX() {
    if (this.state.documentTone !== '') {
      if (this.state.poemAnalysis.length !== 0) {
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
    } else {
      return <div />
    }
  }

  switchStanza(direction) {
    if (direction === 'l' && this.state.currentStanza > 0) {
      this.setState({ currentStanza: this.state.currentStanza - 1 });
    } else if (direction === 'r' && this.state.currentStanza < this.state.poem.length - 1){
      this.setState({ currentStanza: this.state.currentStanza + 1 });
    }
  }

  render() {
    return (
      <div>
        {this.state.currentStanza !== 0 && this.state.documentTone ? 
          <i 
            className="material-icons nav-arrow arrow-left"
            onClick={() => this.switchStanza('l')}
          >chevron_left</i> :
          <div />}
        {this.state.currentStanza !== this.state.poem.length - 1 && this.state.documentTone ? 
          <i 
            className="material-icons nav-arrow arrow-right"
            onClick={() => this.switchStanza('r')}
          >chevron_right</i> :
          <div />}
        {this.state.documentTone !== '' ? 
          <Link to={`/poet/${this.props.match.params.poet}`}>
            <i 
              className="material-icons close-button"
              onClick={() => console.log('ran')}
            >close</i>
          </Link> :
          <div />}
        {this.state.documentTone !== '' ?
          <div> 
            <div className="tone-data">
              Overall: {this.capitalizeFirstLetter(this.state.documentTone)}
              <br />
              Stanza: {this.capitalizeFirstLetter(this.returnCurrentStanzaTone())}
            </div>
            <div className="animated two-second stanza">
              <div className="title-description">
                {this.props.match.params.poem}<br />
                <div className="poet">{this.props.match.params.poet}</div>
                <br />
              </div>
              <p>
              {this.state.poem[this.state.currentStanza]}</p>
            </div>
          </div> :
          <div className="animated spinner-center">
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>}
        {this.returnParticleJSX()}
      </div>
    );
  }
}
