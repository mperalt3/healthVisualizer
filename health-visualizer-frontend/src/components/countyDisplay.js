import React, { Component } from "react";
import { connect } from "react-redux";
import ReactHighcharts from 'react-highcharts';
import FontAwesome from 'react-fontawesome';
import { listDiseases, markAsFavorite, markAsNonFavorite, listCounties } from "../actions/index";
import { generateCharts } from '../utils/chartsConstructor'
import DiseaseDisplay from './diseaseDisplay';
import Chart from './chart'

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
    this.state = {
      config: {}
    };
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
    let config = {};
    if(this.props.currentCounty){
      const { statistics } = this.props.currentCounty;
      let diseaseStats = statistics.filter((statistic) => statistic.diseaseId.name === "physical inactivity" );
      config = generateCharts(diseaseStats);
    }

    return (
      <div id="page-wrapper">
      <div className="container-fluid">
      <div className="row">
          <div className="col-lg-12">
              <h1 className="page-header">
              Dashboard <small>Statistics Overview</small>
              </h1>
          </div>
      </div>
      {currentCounty &&
        <div>
          <div className="row">
            <div class="col-lg-12">
              <div className="panel county-pannel">
                <span className="favorite-pannel">
                  {currentCounty.county.isFavorite &&
                    <span >
                      <FontAwesome
                        className='fas fa-heart red-heart'
                        name='heart'
                        id="markNonFavoriteButton"
                        onClick={this.handleFavoriteButtonClick}
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Mark as non favorite"
                      />
                    </span>
                  }
                  {!currentCounty.county.isFavorite &&
                    <span >
                      <FontAwesome
                        className='fas fa-heart gray-heart'
                        name='heart'
                        id="markFavoriteButton"
                        onClick={this.handleFavoriteButtonClick}
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Mark as favorite!"
                      />
                    </span>
                  }
                </span>
                <h2>{currentCounty.county.name}</h2>
                <span className="state-name">{currentCounty.county.stateId.name}</span>
              </div>
            </div>
          </div>
          <DiseaseDisplay propsDataCharts={config} diseaseName={"physical inactivity"} />
        </div>
      }
      { !currentCounty &&
        <div class="jumbotron">
          <h1 class="display-4">Choose a USA County</h1>
          <p class="lead">This site gather information about indicators that affect the methabolic syndrome. These indicators are obesity, diabetes prevalance and physical inactivity by county of the United States.</p>
          <hr class="my-4"/>
          <p>Choose the county of your interest to see graphic information of these indicators. </p>
        </div>
      }
      </div>
      </div>
    )
  }
}


const CountyDisplay = connect(mapStateToProps, mapDispatchToProps)(ConnectedCountyDisplay);
export default CountyDisplay;
