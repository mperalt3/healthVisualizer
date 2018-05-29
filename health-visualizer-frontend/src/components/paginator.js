import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { listCounties, updateOffset } from '../actions/index';

const mapStateToProps = state => {
  return {
    elementsByPage: state.elementsByPage,
    isFavorite: state.isFavorite,
    totalCounties: state.totalCounties,
    searchName: state.searchName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listCounties: (searchName, isFavorite, limit, offset) => dispatch(listCounties(searchName, isFavorite, limit, offset)),
    updateOffset: (offset) => dispatch(updateOffset(offset))
  };
};

// Component responsible for making the menu of counties pageable
class ConnectedPaginator extends Component {
  constructor(){
    super();
    this.state = {
      pageCount: 1
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick(data) {
    const { elementsByPage, isFavorite, searchName } = this.props;
    let offset = elementsByPage * parseInt(data.selected);
    this.props.updateOffset(offset);
    this.props.listCounties(searchName, isFavorite, elementsByPage, offset);
  };

  render(){
    const { totalCounties, elementsByPage } = this.props;
    let pageCount = Math.ceil(totalCounties / elementsByPage);

    return (
      <div>
      <ReactPaginate previousLabel={"<"}
                       nextLabel={">"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={pageCount}
                       marginPagesDisplayed={1}
                       pageRangeDisplayed={3}
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
