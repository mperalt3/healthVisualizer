import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import '../assets/stylesheets/App.css';
import CountyDisplay from "./countyDisplay";
import Nav from './nav';
import Landing from './landing'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Landing />
        <div id="wrapper">
          <Nav/>
          <CountyDisplay />
        </div>
      </div>
    );
  }
}

export default App;
