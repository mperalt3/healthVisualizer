import React, { Component } from "react";
import { connect } from "react-redux";
import { listCounties, updateSearchName } from "../actions/index";

const mapDispatchToProps = dispatch => {
  return {
    listCounties: (searchName, isFavorite, limit, offset) => dispatch(listCounties(searchName, isFavorite, limit, offset)),
    updateSearchName : (searchName) => dispatch(updateSearchName(searchName))
  };
};

const mapStateToProps = state => {
  return {
    searchName: state.searchName,
    isFavorite: state.isFavorite,
    elementsByPage: state.elementsByPage
  };
};

class ConnectedSearch extends Component {
  constructor() {
    super();
    this.state = {
      searchName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchName: event.target.value })
    this.props.updateSearchName(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { searchName, isFavorite, elementsByPage } = this.props;
    this.props.listCounties(searchName, isFavorite,  elementsByPage, 0);
  }

  render() {
    const { searchName } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="searchName"
            placeholder= "County's name"
            value={searchName}
            onChange={this.handleChange}
          />
          <div class="input-group-btn">
            <button class="btn btn-primary" type="submit">
              <span class="glyphicon glyphicon-search"></span>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const Search = connect(mapStateToProps, mapDispatchToProps)(ConnectedSearch);
export default Search;
