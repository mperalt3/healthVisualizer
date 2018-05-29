import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from './search';
import MenuNav from './menuNav';
import Menu from './menu';
import { updateVisibleLanding } from '../actions/index';

const mapDispatchToProps = dispatch => {
  return {
    updateVisibleLanding: (visibleLanding) => dispatch(updateVisibleLanding(visibleLanding))
  };
};

// Component responsible for rendering the main navigation and the side navigation
class ConnectedNav extends Component {
  constructor(){
    super();
    this.state = {};
    this.handleClickAbout = this.handleClickAbout.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    event.preventDefault();
  }

  handleClickAbout(event){
    event.preventDefault();
    this.props.updateVisibleLanding(true);
  }

  render(){
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">

          <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">Health Visualizer</a>
          </div>

          <ul className="nav navbar-right top-nav">
              <li className="dropdown">
                  <a href="/" className="dropdown-toggle" data-toggle="dropdown" onClick={this.handleClickAbout}><i className="fa fa-question-circle"></i> About </a>
              </li>
              <li className="dropdown">
                  <a href="https://www.cdc.gov/diabetes/data/countydata/countydataindicators.html" className="dropdown-toggle" data-toggle="tooltip"
                  data-placement="bottom"
                  title="Go to CDC web"><i className="fa fa-database"></i> Data Source </a>
              </li>
          </ul>

          <div className="collapse navbar-collapse navbar-ex1-collapse">
              <ul className="nav navbar-nav side-nav">
                  <li className="active">
                      <a href="/" onClick={this.handleClick}><i className="fa fa-fw fa-dashboard"></i> Dashboard</a>
                  </li>
                  <MenuNav />
                  <Search />
                  <Menu />
              </ul>
          </div>

      </nav>

    )
  }
}

const Nav = connect(null, mapDispatchToProps)(ConnectedNav);
export default Nav;
