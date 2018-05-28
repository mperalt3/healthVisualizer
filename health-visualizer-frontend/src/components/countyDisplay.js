import React, { Component } from "react";
import { connect } from "react-redux";
import ReactHighcharts from 'react-highcharts';
import FontAwesome from 'react-fontawesome';
import { listDiseases, markAsFavorite, markAsNonFavorite, listCounties } from "../actions/index";
import { generateCharts } from '../utils/chartsConstructor'
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

let config ={
  totalCountChart: { chart: { type: 'column' }, xAxis: { categories: [] }, series: [], title: {text: ''} },
  percentChart: { chart: { type: 'column' }, xAxis: { categories: [] }, series: [], title: {text: ''} },
  averagePercentChart: { chart: { type: 'column' }, xAxis: { categories: [] }, series: [], title: {text: ''} },
  averageA: 0,
  averageM: 0,
  averageF: 0
}

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
          <div className="row">
            <div class="col-lg-12">
              <div className="disease-title">
                <h3>Disease Name</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div class="col-lg-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title"><i class="fa fa-bar-chart-o fa-fw"></i> Disease Chart</h3>
                </div>
                <div class="panel-body">
                  <ReactHighcharts config={config.totalCountChart}/>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-6">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xs-3">
                              <FontAwesome
                                className='fas fa-users fa-4x'
                                name='users'
                              />
                            </div>
                            <div class="col-xs-9 text-right">
                                <div class="huge">{config.averageA}</div>
                                <div>Total Average</div>
                            </div>
                        </div>
                    </div>
                    <a href="#">
                        <div class="panel-footer">
                            <span class="pull-left">Cases by year</span>

                            <div class="clearfix"></div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-lg-4 col-md-6">
                <div class="panel panel-green">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xs-3">
                            <FontAwesome
                              className='fas fa-mars fa-4x'
                              name='mars'
                            />
                            </div>
                            <div class="col-xs-9 text-right">
                                <div class="huge">{config.averageM}</div>
                                <div>Male Average</div>
                            </div>
                        </div>
                    </div>
                    <a href="#">
                        <div class="panel-footer">
                            <span class="pull-left">Cases by year</span>
                            <div class="clearfix"></div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-lg-4 col-md-6">
                <div class="panel panel-purple">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xs-3">
                            <FontAwesome
                              className='fas fa-venus fa-4x'
                              name='venus'
                            />
                            </div>
                            <div class="col-xs-9 text-right">
                                <div class="huge">{config.averageF}</div>
                                <div>Female Average</div>
                            </div>
                        </div>
                    </div>
                    <a href="#">
                        <div class="panel-footer">
                            <span class="pull-left">Cases by year</span>
                            <div class="clearfix"></div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div className="row">
          <div class="col-lg-5">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title"><FontAwesome
                  className='fas fa-chart fa-chart-pie"'
                  name='chart'
                /> Disease average female vs male</h3>
              </div>
              <div class="panel-body">
                <ReactHighcharts config={config.averagePercentChart}/>
              </div>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title"><FontAwesome
                  className='fa fa-bar-chart-o fa-fw"'
                  name='chart'
                /> Disease Percent chart</h3>
              </div>
              <div class="panel-body">
                <ReactHighcharts config={config.percentChart}/>
              </div>
            </div>
          </div>
        </div>
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
