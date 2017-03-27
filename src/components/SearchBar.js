import axios from 'axios';
import React, { Component } from 'react';
import '../styles/searchbar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      inputColor: '#fff',
      poets: []
    };

    this.highlightColor = this.determineHighlightColor();

    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillMount() {
    axios.get('https://poetdb.herokuapp.com/author')
      .then(poets => this.setState({ poets: poets.data.authors }))
      .catch(err => this.setState({ poets: [] }));
  }

  determineHighlightColor() {
    const rgbBackgroundColor = document.body.style.backgroundColor;
    const rgbValues = rgbBackgroundColor
      .split(',')
      .map(rgb => parseInt(rgb.replace(/\D/g, ''), 10));
    const greatestValue = Math.max(...rgbValues);

    if (greatestValue === rgbValues[0]) { // Red
      return '#1DE9B6';
    } else if (greatestValue === rgbValues[1]) { // Green
      return '#EF6C00';
    } else if (greatestValue === rgbValues[2]) { // Blue
      return '#FF4081';
    }
  }

  onInputChange(event) {
    this.setState({ 
      searchTerm: event.target.value,
      inputColor: this.highlightColor 
    });
  }

  returnPoetSuggestions() {
    return this.state.poets
      .filter(poet => this.state.searchTerm.length && poet.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
      .slice(0, 3)
      .map(poet => {
        return (
          <li
            className="poet-suggestion" 
            key={poet} 
          >
            <div className="poet-suggestion-left">{poet}</div>
            <div className="poet-suggestion-right">
              <i className="material-icons">keyboard_arrow_right</i>
            </div>
          </li>
        );
      });
  }

  render() {
    return (
      <div style={{ width: '100%', margin: 'auto' }}>
        <input
          autoComplete="off"
          className="searchbar"
          onChange={this.onInputChange}
          onFocus={() => this.setState({ inputColor: this.highlightColor })}
          onBlur={() => this.state.searchTerm === '' ? 
            this.setState({ inputColor: '#fff' }) :
            this.setState({ inputColor: this.highlightColor })  
          }
          placeholder="Enter a Poet to Begin"
          style={{ 
            borderBottom: '2px solid ' + this.state.inputColor, 
            color: this.highlightColor
          }}
          value={this.state.searchTerm}
        />
        <ul className="poet-suggestion-ul">
          {this.returnPoetSuggestions()}
        </ul>
      </div>
    );
  }
}

export default SearchBar;
