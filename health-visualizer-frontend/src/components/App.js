import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import '../assets/stylesheets/App.css';
import Menu from "./menu";
import Search from "./search";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search/>
        <Menu/>
      </div>
    );
  }
}

export default App;
