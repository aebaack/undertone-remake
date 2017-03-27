import axios from 'axios';
import React, { Component } from 'react';

class PoemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poems: []
    }
  }

  componentWillMount() {
    axios.get(`https://poetdb.herokuapp.com/author/${this.props.match.params.poet}`)
      .then(poems => this.setState({ poems: poems.data }))
      .catch(err => this.setState({ poems: [] }))
  }

  render() {
    return (
      <div>
        {this.state.poems.map(poem => <p>{poem.title}</p>)}
      </div>
    );
  }
}

export default PoemList;
