import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';
import Search from "./search";
import MenuNav from "./menuNav";
import Menu from "./menu";


class Nav extends Component {
  constructor(){
    super();
    this.state = {};
  }

  render(){
    return (
      <div>
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">

          <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="index.html">Health Visualizer</a>
          </div>

          <ul class="nav navbar-right top-nav">
              <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-question-circle"></i> About </a>
              </li>
              <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-database"></i> Data Source </a>
              </li>
          </ul>

          <div class="collapse navbar-collapse navbar-ex1-collapse">
              <ul class="nav navbar-nav side-nav">
                  <li class="active">
                      <a href="index.html"><i class="fa fa-fw fa-bar-chart-o"></i> Dashboard</a>
                  </li>
                  <MenuNav />
                  <Search />
                  <Menu />
              </ul>
          </div>

      </nav>
      </div>
    )
  }
}


export default Nav;
