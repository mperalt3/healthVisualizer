import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { listDiseases, markAsFavorite, markAsNonFavorite } from '../actions/index';
import { generateCharts } from '../utils/chartsConstructor'
import DiseaseDisplay from './diseaseDisplay';


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

// Component responsible for displaying the data of the selected county and selected disease
class ConnectedCountyDisplay extends Component {
  constructor(){
    super();
    this.state = {
      currentDiseaseName: "physical inactivity"
    };
    this.handleFavoriteButtonClick = this.handleFavoriteButtonClick.bind(this);
    this.handleDiseaseClick = this.handleDiseaseClick.bind(this);
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

  handleDiseaseClick(event){
    event.preventDefault();
    this.setState({currentDiseaseName: event.target.id});
  }

  render(){
    const { currentCounty, diseases } = this.props;
    const { currentDiseaseName } = this.state;
    let diseasesCharts = {};
    if(this.props.currentCounty){
      const { statistics } = this.props.currentCounty;
      diseases.forEach(function(disease){
        let diseaseStats = statistics.filter((statistic) => statistic.diseaseId.name === disease.name );
        diseasesCharts[disease.name] = generateCharts(diseaseStats);
      });
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
            <div className="col-lg-12">
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
          <div className="row">
            <div className="col-lg-12  diseases-nav">
              <ul className="nav nav-tabs">
              {diseases.map(el => (
                <li className="nav-item" key={el._id}>
                  <a className={`nav-link ${el.name === currentDiseaseName ? 'disease-active' : ''}`} href="/" id={el.name} onClick={this.handleDiseaseClick}>{el.name}</a>
                </li>
              ))}
              </ul>
            </div>
          </div>
          <DiseaseDisplay propsDataCharts={diseasesCharts[currentDiseaseName]} diseaseName={currentDiseaseName} />
        </div>
      }
      { !currentCounty &&
        <div className="jumbotron">
          <h1 className="display-4">Choose a USA County</h1>
          <p className="lead">This site gather information about indicators that affect the methabolic syndrome. These indicators are obesity, diabetes prevalance and physical inactivity by county of the United States.</p>
          <hr className="my-4"/>
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
