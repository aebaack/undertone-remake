import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/searchbar.css';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputColor: '#fff', // Color of the text in the search bar
      poets: [], // List of poets in PoetryDB
      searchTerm: '' // Current value of the input field
    };

    // Color of the input field on highlight (Changed based on page background color)
    this.highlightColor = this.determineHighlightColor();

    this.onInputChange = this.onInputChange.bind(this);
  }

  // Fetch list of poets from PoetryDB
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
          <Link key={poet} style={{ textDecoration: 'none' }} to={`/poet/${poet}`}>
            <li className="poet-suggestion-li">
              <div className="poet-suggestion-left">{poet}</div>
              <i className="material-icons poet-suggestion-right">chevron_right</i>
            </li>
          </Link>
        )) :
      <div />;
  }

  // Render poet search bar with suggestions
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
