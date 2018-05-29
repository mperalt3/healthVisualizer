import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import error from '../assets/images/error2.jpg';

// Component responsible for displaying error
class ErrorContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="error">
        <h1> Connection Error </h1>
        <img src={error} />
        <p> Please, check your connection with Healt Visualizer API</p>
      </div>
    );
  }
}

export default ErrorContainer;
