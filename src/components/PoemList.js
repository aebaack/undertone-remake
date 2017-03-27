import axios from 'axios';
import React, { Component } from 'react';
import '../styles/poemlist.css';

class PoemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poems: []
    }

    this.formatPoemList = this.formatPoemList.bind(this);
  }

  componentWillMount() {
    axios.get(`https://poetdb.herokuapp.com/author/${this.props.match.params.poet}`)
      .then(poems => this.setState({ poems: poems.data }))
      .catch(err => this.setState({ poems: [] }))
    // this.setState({ poems: [{title: 'Poem 1'}, {title: 'Poem 2'}] });
  }

  formatPoemList() {
    return this.state.poems
      .map(poem => (
        <li className="poem-list-li">
          <div className="poem-info-left">{poem.title}</div>
          <i className="material-icons poem-info-right">keyboard_arrow_right</i>
        </li>
      ));
  }

  render() {
    return (
      <div className="poem-list">
        <h1 className="poet-name">{this.props.match.params.poet}</h1>
        <ul className="poem-list-ul">{this.formatPoemList()}</ul>
      </div>
    );
  }
}

export default PoemList;
