import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';

const mapStateToProps = state => {
  return { county: state.currentCounty };
};

class ConnectedCountyDisplay extends Component {
  constructor(){
    super();
    this.state = {};
  }

  render(){
    const { county } = this.props;
    console.log("countyDisplay ")
    console.log(county)
    return (
      <div>
      {county &&
        <div>
          <h2>{county.name}</h2>
          <h3>{county.fipsCode}</h3>
          {county.isFavorite &&
            <span><FontAwesome
            className='fas fa-heart'
            name='heart'
          /></span>
          }
        </div>
      }
      { !county &&
        <h2>Choose a county to see it's health info</h2>
      }
      </div>
    )
  }
}


const CountyDisplay = connect(mapStateToProps, null)(ConnectedCountyDisplay);
export default CountyDisplay;
