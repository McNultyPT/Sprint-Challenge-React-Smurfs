import React, { Component } from 'react';
import axios from 'axios';

import './Smurf.css';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        age: '',
        height: ''
    };
  }

  addSmurf = event => {
    event.preventDefault();
    axios
      .post('http://localhost:3333/smurfs', this.state)
      .then(res => {
        this.setState({
          name: res.data.name,
          age: res.data.age,
          height: res.data.height
        });
        this.props.history.push('/');
        window.location.reload();
      })
      .catch(err => console.log(err));
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="Name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="Age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="Height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Add to the Village</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
