import axios from 'axios';
import Particles from 'react-particles-js';
import React, { Component } from 'react';

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
      //   axios.post('https://undertone-watson.herokuapp.com/', {text: formattedPoem[1]})
      //     .then(watsonAnalysis => {
      //       this.setState({ poemAnalysis: watsonAnalysis.data.sentences_tone });
      //       const mainDocumentTone = watsonAnalysis.data.document_tone.tone_categories[0].tones
      //         .reduce((mainTone, currentTone) => {
      //           if (currentTone.score > mainTone[0]) {
      //             [mainTone[0], mainTone[1]] = [currentTone.score, currentTone.tone_id];
      //           }
      //           return mainTone;
      //         }, [0, '']);
      //       this.setState({ documentTone: mainDocumentTone[1] });
      //     })
      //     .catch(err => this.setState({ displayError: true }));
        this.setState({ documentTone: 'fear' });
      })
      .catch(err => this.setState({ poems: [] }));
  }

  componentDidMount() {
    setTimeout(() => document.body.classList.add('transition-background'), 100);
  }

  determineBackgroundColor() {
    switch(this.state.documentTone) {
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

  returnParticleJSX() {
    if (this.state.documentTone !== '') {
      document.body.style.backgroundColor = this.determineBackgroundColor();
      return (
        <Particles 
          style={{ 
            left: 0, 
            position: 'fixed', 
            scale: 1.1, 
            top: 0 
          }} 
          params={{
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
          }}
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
        {this.state.currentStanza !== 0 ? 
          <i 
            className="material-icons nav-arrow arrow-left"
            onClick={() => this.switchStanza('l')}
          >chevron_left</i> :
          <div />}
        {this.state.currentStanza !== this.state.poem.length - 1 ? 
          <i 
            className="material-icons nav-arrow arrow-right"
            onClick={() => this.switchStanza('r')}
          >chevron_right</i> :
          <div />}
        {this.state.documentTone !== '' ? 
          <div className="stanza">
            <div className="title-description">
              {this.props.match.params.poem}<br />
              <div className="poet">{this.props.match.params.poet}</div>
              <br />
            </div>
            <p>
            {this.state.poem[this.state.currentStanza]}</p>
          </div> :
          <div />}
        {this.returnParticleJSX()}
      </div>
    );
  }
}
