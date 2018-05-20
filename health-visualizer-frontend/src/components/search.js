import React, { Component } from "react";
import { connect } from "react-redux";
import { listCounties, updateSearchName } from "../actions/index";

const mapDispatchToProps = dispatch => {
  return {
    listCounties: (searchName, limit, offset) => dispatch(listCounties(searchName, limit, offset)),
    updateSearchName : (searchName) => dispatch(updateSearchName(searchName))
  };
};

const mapStateToProps = state => {
  return { searchName: state.searchName };
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
    const { searchName } = this.props;
    this.props.listCounties(searchName, 10, 0);
  }

  render() {
    const { searchName } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="searchName">County's name</label>
          <input
            type="text"
            className="form-control"
            id="searchName"
            value={searchName}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          Search
        </button>
      </form>
    );
  }
}

const Search = connect(mapStateToProps, mapDispatchToProps)(ConnectedSearch);
export default Search;
