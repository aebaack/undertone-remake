import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PoemListItem from './PoemListItem';
import '../styles/poemlist.css';

class PoemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poems: [],
      waitedLongEnough: false
    }

    this.formatPoemList = this.formatPoemList.bind(this);
  }

  componentWillMount() {
    axios.get(`https://poetdb.herokuapp.com/author/${this.props.match.params.poet}`)
      .then(poems => this.setState({ poems: poems.data }))
      .catch(err => this.setState({ poems: [] }));
    
    setTimeout(() => this.setState({ waitedLongEnough: true }), 2000);
    // this.setState({ poems: [{title: 'Poem 1'}, {title: 'Poem 2'}] });
  }

  formatPoemList() {
    return this.state.poems.length > 0 && this.state.waitedLongEnough ?
      this.state.poems
        .map(poem => (
          <PoemListItem key={poem.title} poem={poem} />
        )) :
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
  }

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

export default PoemList;
