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
        <div class="collapse navbar-collapse navbar-ex1-collapse  ">
                <ul class="nav navbar-nav side-nav">
                    <li class="active">
                        <a href="index.html"><i class="fa fa-fw fa-dashboard"></i> Dashboard</a>
                    </li>
                    <Search />
                    <MenuNav />
                    <Menu />
                </ul>
            </div>


          <div className="container-fluid">
            <CountyDisplay />
          </div>

      </div>
    );
  }
}

export default App;
