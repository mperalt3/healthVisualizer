import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';
import { listDiseases, markAsFavorite, markAsNonFavorite, listCounties } from "../actions/index";

const mapStateToProps = state => {
  return {
    currentCounty: state.currentCounty,
    diseases: state.diseases,
    searchName: state.searchName,
    elementsByPage: state.elementsByPage,
    isFavorite: state.isFavorite,
    offset: state.offset
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listDiseases: () => dispatch(listDiseases()),
    markAsFavorite: (countyId, searchName, isFavorite, elementsByPage, offset) => dispatch(markAsFavorite(countyId, searchName, isFavorite, elementsByPage, offset)),
    markAsNonFavorite: (countyId, searchName, isFavorite, elementsByPage, offset) => dispatch(markAsNonFavorite(countyId, searchName, isFavorite, elementsByPage, offset))
  };
};

class ConnectedCountyDisplay extends Component {
  constructor(){
    super();
    this.state = {};
    this.handleFavoriteButtonClick = this.handleFavoriteButtonClick.bind(this);
  }

  componentDidMount(){
    this.props.listDiseases();
  }

  handleFavoriteButtonClick(event){
    event.preventDefault();
    const { currentCounty, searchName, isFavorite, elementsByPage, offset } = this.props;
    if (event.target.id === "markFavoriteButton"){
      this.props.markAsFavorite(currentCounty.county._id, searchName, isFavorite, elementsByPage, offset);
    }else{
      this.props.markAsNonFavorite(currentCounty.county._id, searchName, isFavorite, elementsByPage, offset);
    }
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
          <div>
            <button id="markFavoriteButton" onClick={this.handleFavoriteButtonClick}> Mark as favorite </button>
            <button id="markNonFavoriteButton" onClick={this.handleFavoriteButtonClick}> Mark as non favorite </button>
          </div>
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
