import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from 'react-paginate';

// const mapStateToProps = state => {
//   return { counties: state.counties };
// };

class Paginator extends Component {
  constructor(){
    super();
    this.state = {
      totalPages: 3,
      offset: 0
    };
  }

  handlePageClick(data) {
    console.log(data)
    // let selected = data.selected;
    // let offset = Math.ceil(selected * this.props.perPage);
    //
    // this.setState({offset: offset}, () => {
    //   this.loadCommentsFromServer();
    // });
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


// const Menu = connect(mapStateToProps, null)(ConnectedMenu);
export default Paginator;
