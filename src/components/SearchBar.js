import axios from 'axios';
import React, { Component } from 'react';
import '../styles/searchbar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      inputColor: '#fff'
    };

    this.highlightColor = this.determineHighlightColor();

    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillMount() {
    
  }

  determineHighlightColor() {
    const rgbBackgroundColor = document.body.style.backgroundColor;
    const rgbValues = rgbBackgroundColor
      .split(',')
      .map(rgb => parseInt(rgb.replace(/\D/g, ''), 10));
    const greatestValue = Math.max(...rgbValues);

    if (greatestValue === rgbValues[0]) {
      // Red
      return '#1DE9B6';
    } else if (greatestValue === rgbValues[1]) {
      // Green
      return '#EF6C00';
    } else if (greatestValue === rgbValues[2]) {
      // Blue
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
    return ['William Shakespeare', 'Emily Dickinson']
      .map(poet => {
        return (
          <li
            className="poet-suggestion" 
            key={poet} 
          >
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ textAlign: 'left', flex: 9 }}>
                {poet}
              </div>
              <div className="test" style={{ textAlign: 'right', flex: 1 }}>
                <i className="material-icons">keyboard_arrow_right</i>
              </div>
            </div>
          </li>
        );
      });
  }

  render() {
    return (
      <div style={{ width: '75%', margin: 'auto' }}>
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
        <ul 
          style={{  
            listStyleType: 'none', 
            margin: 0, 
            marginTop: 1,  
            padding: 0 }}
        >
          {this.returnPoetSuggestions()}
        </ul>
      </div>
    );
  }
}

export default SearchBar;
