import React, { Component } from "react";
import { connect } from "react-redux";
import { listCounties, updateIsFavorite } from "../actions/index";

const mapDispatchToProps = dispatch => {
  return {
    listCounties: (searchName, isFavorite, limit, offset) => dispatch(listCounties(searchName, isFavorite, limit, offset)),
    updateIsFavorite: (isFavorite) => dispatch(updateIsFavorite(isFavorite))
  };
};

const mapStateToProps = state => {
  return {
    elementsByPage: state.elementsByPage,
    searchName: state.searchName
  };
};

class ConnectedMenuNav extends Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false
    };
    this.handleClickOption = this.handleClickOption.bind(this);
  }

  handleClickOption(event) {
    event.preventDefault();
    const { elementsByPage, searchName } = this.props;
    const value = event.target.id == "favorites";
    this.setState({ isFavorite: value });
    this.props.updateIsFavorite(value);
    this.props.listCounties(searchName, value, elementsByPage, 0);
  }

  render() {
    return (
      <div className="headerMenu" >
      <button id="all" onClick={this.handleClickOption}> All </button>
      <button id="favorites" onClick={this.handleClickOption}> My favorites </button>
      </div>
    );
  }
}

const MenuNav = connect(mapStateToProps, mapDispatchToProps)(ConnectedMenuNav);
export default MenuNav;
