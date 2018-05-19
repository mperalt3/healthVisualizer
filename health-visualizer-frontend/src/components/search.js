import React, { Component } from "react";
import { connect } from "react-redux";
import { listCounties3 } from "../actions/index";
// import { getCounties } from "../services/countiesService"

const mapDispatchToProps = dispatch => {
  return {
    listCounties: () => dispatch(listCounties3())
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
    this.props.listCounties();
    // const counties = getCounties();
    // console.log("handlesubmit:" + counties)
    this.setState({ searchQuery: "" });
  }

  render() {
    const { searchQuery } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="searchQuery">Name</label>
          <input
            type="text"
            className="form-control"
            id="searchQuery"
            value={searchQuery}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          Search County {this.props.name}
        </button>
      </form>
    );
  }
}

const Search = connect(null, mapDispatchToProps)(ConnectedSearch);
export default Search;
