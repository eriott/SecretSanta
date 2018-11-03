import React from 'react'
import PropTypes from 'prop-types';
import {Grid} from "react-bootstrap";

import './App.css';

const propTypes = {
  children: PropTypes.node
};

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Grid>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div className='container-fluid bg-main jumbotron jumbotron-fluid text-center'>
        <h1>
          <span className='fa fa-lock text-white font-weight-bold'>Secret Santa</span>
        </h1>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;