import axios from 'axios';
import React, { Component } from 'react';
import '../styles/searchbar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputColor: '#fff',
      poets: [],
      searchTerm: ''
    };

    this.highlightColor = this.determineHighlightColor();

    this.onInputChange = this.onInputChange.bind(this);
  }

  // Fetch list of poets from poetdb
  componentWillMount() {
    axios.get('https://poetdb.herokuapp.com/author')
      .then(poets => this.setState({ poets: poets.data.authors }))
      .catch(err => this.setState({ poets: [] }));
  }

  // Return hex color of input highlight on focus
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

  // Update current search term and color of input bar
  onInputChange(event) {
    this.setState({ 
      searchTerm: event.target.value,
      inputColor: this.highlightColor 
    });
  }

  // Return JSX of poet search suggestions as user types
  returnPoetSuggestions() {
    return this.state.searchTerm.length ?
      this.state.poets
        .filter(poet => new RegExp(this.state.searchTerm, 'ig').test(poet))
        .slice(0, 3)
        .map(poet => (
          <li className="poet-suggestion" key={poet}>
            <div className="poet-suggestion-left">{poet}</div>
            <div className="poet-suggestion-right">
              <i className="material-icons">keyboard_arrow_right</i>
            </div>
          </li>
        )) :
      <div />;
  }

  render() {
    return (
      <div style={{ width: '100%', margin: 'auto' }}>
        <input
          autoComplete="off"
          className="searchbar"
          onBlur={() => this.state.searchTerm === '' ? 
            this.setState({ inputColor: '#fff' }) :
            this.setState({ inputColor: this.highlightColor })  
          }
          onChange={this.onInputChange}
          onFocus={() => this.setState({ inputColor: this.highlightColor })}
          placeholder="Enter a Poet to Begin"
          style={{ 
            borderBottom: '2px solid ' + this.state.inputColor, 
            color: this.highlightColor
          }}
          value={this.state.searchTerm}
        />
        <ul className="poet-suggestion-ul">{this.returnPoetSuggestions()}</ul>
      </div>
    );
  }
}

export default SearchBar;
