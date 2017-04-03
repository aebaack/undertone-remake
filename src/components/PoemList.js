import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PoemListItem from './PoemListItem';

import { determineBackgroundColor } from '../scripts/backgroundColor';
import '../styles/poemlist.css';

export default class PoemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poems: [], // List of poems by the searched for author
      waitedLongEnough: false // Allows search animation to appear for at least 2 seconds
    }

    this.formatPoemList = this.formatPoemList.bind(this);
  }

  // Populate list of poems and ensure search animation lasts for at least 2 seconds
  componentWillMount() {
    determineBackgroundColor();

    axios.get(`https://poetdb.herokuapp.com/author/${this.props.match.params.poet}`)
      .then(poems => this.setState({ poems: poems.data }))
      .catch(err => this.setState({ poems: [] }));
    
    setTimeout(() => this.setState({ waitedLongEnough: true }), 2000);
  }

  // Return JSX of list of poems to display on page or displays search animation if
  // API call has not been resolved
  formatPoemList() {
    return this.state.poems.length > 0 && this.state.waitedLongEnough ?
      this.state.poems
        .map((poem, i) => (
          <PoemListItem key={i} poem={poem} />
        )) :
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
  }

  // Render search results from poet selection
  render() {
    return (
      <div>
        <Link to='/'>
          <i className="material-icons back-button">chevron_left</i>
        </Link> 
        <div className="poem-list">
          <h1 className="poet-name">{this.props.match.params.poet}</h1>
          <ul className="poem-list-ul">{this.formatPoemList()}</ul>
        </div>
      </div>
    );
  }
}
