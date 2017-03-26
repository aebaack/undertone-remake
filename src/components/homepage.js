import React, { Component } from 'react';
import '../styles/homepage.css';

class Homepage extends Component {
  render() {
    return (
      <div className="homepage-text">
        <div className="header">
          <h1 className="logo">undertone</h1>
          <h2>Classic Poetry — Now in Color</h2>
        </div>
        <div className="search"></div>
      </div>
    );
  }
}

export default Homepage;
