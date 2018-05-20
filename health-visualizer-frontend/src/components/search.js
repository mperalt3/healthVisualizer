import React, { Component } from "react";
import { connect } from "react-redux";
import { listCounties } from "../actions/index";

const mapDispatchToProps = dispatch => {
  return {
    listCounties: (searchName, limit, offset) => dispatch(listCounties(searchName, limit, offset))
  };
};

class ConnectedSearch extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { searchQuery } = this.state;
    this.props.listCounties(searchQuery, 10, 0);
    this.setState({ searchQuery: "" });
  }

  render() {
    const { searchQuery } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="searchQuery">County's name</label>
          <input
            type="text"
            className="form-control"
            id="searchQuery"
            value={searchQuery}
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

const Search = connect(null, mapDispatchToProps)(ConnectedSearch);
export default Search;
