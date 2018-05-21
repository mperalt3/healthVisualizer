import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from 'react-paginate';
import { listCounties } from "../actions/index";

const mapStateToProps = state => {
  return {  elementsByPage: state.elementsByPage,
            totalCounties: state.totalCounties,
            searchName: state.searchName
          };
};

const mapDispatchToProps = dispatch => {
  return {
    listCounties: (searchName, limit, offset) => dispatch(listCounties(searchName, limit, offset))
  };
};

class ConnectedPaginator extends Component {
  constructor(){
    super();
    this.state = {
      pageCount: 1
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount(){
  }

  handlePageClick(data) {
    const { elementsByPage, searchName, totalCounties } = this.props;
    console.log(data)
    let offset = elementsByPage * parseInt(data.selected);
    this.props.listCounties(searchName, elementsByPage, offset);
  };

  render(){
    const { totalCounties, elementsByPage } = this.props;
    let pageCount = Math.ceil(totalCounties / elementsByPage);

    return (
      <div>
      <div>total de datos: {totalCounties ? totalCounties : "nada"}</div>
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


const Paginator = connect(mapStateToProps, mapDispatchToProps)(ConnectedPaginator);
export default Paginator;
