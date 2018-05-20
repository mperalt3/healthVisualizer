import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import '../assets/stylesheets/App.css';
import Menu from "./menu";
import Search from "./search";
import CountyDisplay from "./countyDisplay";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-md-4 col-xs-12">
            <Search/>
            <Menu/>
          </div>
          <div className="col-md-4 col-xs-12">
            <CountyDisplay />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
