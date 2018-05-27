import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import '../assets/stylesheets/App.css';
import Menu from "./menu";
import MenuNav from "./menuNav";
import Search from "./search";
import CountyDisplay from "./countyDisplay";
import Nav from "./nav";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        <div className="container container-fluid">
          <div className="row row-fluid">
            <div id="page-wrapper">
              <CountyDisplay />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
