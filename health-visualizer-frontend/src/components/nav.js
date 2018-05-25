import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';


class Nav extends Component {
  constructor(){
    super();
    this.state = {};
    // this.handleFavoriteButtonClick = this.handleFavoriteButtonClick.bind(this);
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
                      <a href="index.html"><i class="fa fa-fw fa-dashboard"></i> Dashboard</a>
                  </li>
                  <li>
                      <a href="charts.html"><i class="fa fa-fw fa-bar-chart-o"></i> Charts</a>
                  </li>
                  <li>
                      <a href="tables.html"><i class="fa fa-fw fa-table"></i> Tables</a>
                  </li>
                  <li>
                      <a href="forms.html"><i class="fa fa-fw fa-edit"></i> Forms</a>
                  </li>
                  <li>
                      <a href="bootstrap-elements.html"><i class="fa fa-fw fa-desktop"></i> Bootstrap Elements</a>
                  </li>
                  <li>
                      <a href="bootstrap-grid.html"><i class="fa fa-fw fa-wrench"></i> Bootstrap Grid</a>
                  </li>
                  <li>
                      <a href="javascript:;" data-toggle="collapse" data-target="#demo"><i class="fa fa-fw fa-arrows-v"></i> Dropdown <i class="fa fa-fw fa-caret-down"></i></a>
                      <ul id="demo" class="collapse">
                          <li>
                              <a href="#">Dropdown Item</a>
                          </li>
                          <li>
                              <a href="#">Dropdown Item</a>
                          </li>
                      </ul>
                  </li>
                  <li>
                      <a href="blank-page.html"><i class="fa fa-fw fa-file"></i> Blank Page</a>
                  </li>
                  <li>
                      <a href="index-rtl.html"><i class="fa fa-fw fa-dashboard"></i> RTL Dashboard</a>
                  </li>
              </ul>
          </div>

      </nav>
      </div>
    )
  }
}


export default Nav;
