import React, { Component } from 'react';

import github from '../images/GitHub-Mark-120px-plus.png';
import '../styles/notice.css';

export default class Notice extends Component {
  // Render GitHub link and Chrome notice
  render() {
    return (
      <div className="notice">
        <a href="https://github.com/aebaack/undertone-remake">
          <img src={github} alt="GitHub Icon" />
        </a>
      </div>
    );
  }
}
