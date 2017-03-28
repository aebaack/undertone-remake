import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/poemlist.css';

export default class PoemListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poemVisible: false // Controls visibility of the lines of the poem
    }

    this.returnPoemLines = this.returnPoemLines.bind(this);
  }

  // Return JSX of the lines of the poem to display if user clicks on poem name
  // Note: \xa0 is a non-breakable space character in a JavaScript string
  // It is used to add a space between each stanza
  returnPoemLines() {
    return this.state.poemVisible ?
      <div style={{ paddingBottom: '15px', paddingTop: '15px' }}>
        {this.props.poem.lines
          .map(line => <p style={{ margin: '1px 0 3px 0' }}>{line || '\xa0'}</p>) } 
      </div> :
      <div />
  }

  // Render an individual poem info list item
  render() {
    return (
      <div className="poem-list-div">
        <li className="poem-list-li">
          <div 
            className="poem-info-left" 
            onClick={() => this.setState({ poemVisible: !this.state.poemVisible })}
          >
            {this.props.poem.title}
          </div>
          <Link to={`/poet/${this.props.poem.author}/poem/${this.props.poem.title}`}>
            <i className="material-icons poem-info-right">chevron_right</i>
          </Link>
        </li>
        {this.returnPoemLines()}
      </div>
    )
  }
}
