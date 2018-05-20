import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from 'react-paginate';
import { listCounties } from "../actions/index";

const mapDispatchToProps = dispatch => {
  return {
    listCounties: (searchName, limit, offset) => dispatch(listCounties(searchName, limit, offset))
  };
};

class ConnectedPaginator extends Component {
  constructor(){
    super();
    this.state = {
      currentPage: 1,
      pageCount: 1,
      offset: 0
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount(){
    const { totalCount, elementsByPage } = this.props;
    let pageCount = Math.ceil(totalCount / elementsByPage);
    this.setState({ pageCount: pageCount });
  }

  handlePageClick(data) {
    const { elementsByPage } = this.props;
    console.log(data)
    let offset = elementsByPage * parseInt(data.selected) + elementsByPage;
    this.props.listCounties(null, elementsByPage, offset);
  };

  render(){
    const { pageCount } = this.state;

    return (
      <div>
      <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
      </div>
    )
  }
}


const Paginator = connect(null, mapDispatchToProps)(ConnectedPaginator);
export default Paginator;
