import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        this.setState({
          smurfs: res.data
        })
      })
      .catch(err => console.log(err));
  }

  deleteSmurf = (e, smurfId) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3333/smurfs/${smurfId}`)
      .then(res => {
        this.setState({
          smurfs: res.data
        })
        window.location.reload();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <nav>
          <h1 className='navHeader'>Smurf Village</h1>
          <div className='navLinks'>
            <NavLink to='/' activeClassName='navLink'>Home</NavLink>
            <NavLink to='/smurf-form' activeClassName='navLink'>Add a Smurf</NavLink>
          </div>
        </nav>
        
        <Route
          exact
          path='/'
          render={props => 
            <Smurfs 
              {...props} 
              smurfs={this.state.smurfs} 
              deleteSmurf={this.deleteSmurf}
            />
          }
        />

        <Route
          path='/smurf-form'
          render={props => <SmurfForm {...props} />}
        />

      </div>
    );
  }
}

export default App;
