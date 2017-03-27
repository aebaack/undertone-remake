import React, { Component } from 'react';
import SearchBar from './SearchBar';
import '../styles/homepage.css';

class Homepage extends Component {
  render() {
    return (
      <div className="homepage-text">
        <div className="header">
          <h1 className="logo">undertone</h1>
          <h2>Classic Poetry — Now in Color</h2>
        </div>
        <div style={{ margin: 'auto', position: 'relative', width: '75%' }}>
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default Homepage;
