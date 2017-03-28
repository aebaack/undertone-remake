import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/poemlist.css';

class PoemListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poemVisible: false
    }

    this.returnPoemLines = this.returnPoemLines.bind(this);
  }

  returnPoemLines() {
    return this.state.poemVisible ?
      <div style={{ paddingBottom: '15px', paddingTop: '15px' }}>
        {this.props.poem.lines
          .map(line => <p style={{ margin: '1px 0 3px 0' }}>{line || '\xa0'}</p>) } 
      </div> : // \xa0 is a non-breakable space in a JavaScript string
      <div />
  }

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
          <i className="material-icons poem-info-right">chevron_right</i>
        </li>
        {this.returnPoemLines()}
      </div>
    )
  }
}

export default PoemListItem;
