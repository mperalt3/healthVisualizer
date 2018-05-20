import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';

const mapStateToProps = state => {
  return { currentCounty: state.currentCounty };
};

class ConnectedCountyDisplay extends Component {
  constructor(){
    super();
    this.state = {};
  }

  render(){
    const { currentCounty } = this.props;
    console.log("countyDisplay ")
    console.log(currentCounty)
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
        </div>
      }
      { !currentCounty &&
        <h2>Choose a county to see it's health info</h2>
      }
      </div>
    )
  }
}


const CountyDisplay = connect(mapStateToProps, null)(ConnectedCountyDisplay);
export default CountyDisplay;
