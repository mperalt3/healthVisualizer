import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';
import { listDiseases } from "../actions/index";

const mapStateToProps = state => {
  return {
    currentCounty: state.currentCounty,
    diseases: state.diseases
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listDiseases: () => dispatch(listDiseases()),
  };
};

class ConnectedCountyDisplay extends Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.props.listDiseases();
  }

  render(){
    const { currentCounty, diseases } = this.props;
    return (
      <div>
      {currentCounty &&
        <div>
          <h2>{currentCounty.county.name}</h2>
          <h3>{currentCounty.county.fipsCode}</h3>
          {currentCounty.county.isFavorite &&
            <span><FontAwesome
            className='fas fa-heart'
            name='heart'
          /></span>
          }
          <div>
          Diseases
          {diseases.map(el => (
            <li key={el._id}>{el.name}</li>
          ))}
          </div>
        </div>
      }
      { !currentCounty &&
        <h2>Choose a county to see it's health info</h2>
      }
      </div>
    )
  }
}


const CountyDisplay = connect(mapStateToProps, mapDispatchToProps)(ConnectedCountyDisplay);
export default CountyDisplay;
