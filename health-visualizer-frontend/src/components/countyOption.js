import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';
import { listCounty } from "../actions/index";


const mapDispatchToProps = dispatch => {
  return {
    listCounty: (countyId) => dispatch(listCounty(countyId))
  };
};

class ConnectedCountyOption extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    console.log("auch!" + this.props.county.name)
    this.props.listCounty(this.props.county._id);
  }

  render() {
    const { county } = this.props;
    return (
      <div className="option" key={county._id} onClick={this.handleClick} >
      <span>{county.name}</span>
      <span>{county.fipsCode}</span>
      {county.isFavorite &&
        <span><FontAwesome
        className='fas fa-heart'
        name='heart'
      /></span>
      }
      </div>
    );
  }
}

const CountyOption = connect(null, mapDispatchToProps)(ConnectedCountyOption);
export default CountyOption;
