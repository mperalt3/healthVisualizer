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
      <nav className="navbar navbar-inverse navbar" role="navigation">

        <a className="navbar-brand" href="#">Navbar</a>
        <div className="nav navbar-right" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="#">About</a>
            <a className="nav-item nav-link" href="#">Source</a>
          </div>
        </div>

      </nav>
      </div>
    )
  }
}


export default Nav;
