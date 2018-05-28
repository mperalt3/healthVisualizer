import React, { Component } from "react";
import { connect } from "react-redux";
import ReactHighcharts from 'react-highcharts';
import FontAwesome from 'react-fontawesome';
import { listDiseases, markAsFavorite, markAsNonFavorite, listCounties } from "../actions/index";
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
  totalCount: { chart: { type: 'column' }, xAxis: { categories: [] }, series: [], title: {text: ''} },
  percent: { chart: { type: 'column' }, xAxis: { categories: [] }, series: [], title: {text: ''} },
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

  getConfigData(diseaseStats){
    let years = [];
    let serieArray = ["A", "M", "F"];
    let series = {
      "A": {
        totalCount: [],
        percent: [],
        sum: 0,
        count: 0
      },
      "M": {
        totalCount: [],
        percent: [],
        sum: 0,
        count: 0
      },
      "F": {
        totalCount: [],
        percent: [],
        sum: 0,
        count: 0
      }
    }
    diseaseStats.forEach(function(stat){
      let year = (new Date(stat.statisticDate)).getUTCFullYear();
      if (years.findIndex((element) => element === year) === -1) {
        years.push(year);
      }
    });
    years.forEach(function(year){
      serieArray.forEach(function (serie){
        let stat = diseaseStats.find(element => (new Date(element.statisticDate)).getUTCFullYear() === year && element.genderScope === serie );
        if (stat){
          series[serie].totalCount.push(stat.totalCount);
          series[serie].sum += stat.totalCount;
          series[serie].count += 1;
          series[serie].percent.push(stat.percent);
        }else{
          series[serie].totalCount.push(0);
          series[serie].percent.push(0);
        }
      })
    });
    console.log(series)
    return {
      totalCount:{
        xAxis: {
          categories: years
        },
        series: [{
          type: 'column',
          data: series.A.totalCount,
          name: 'All'
        }, {
          type: 'column',
          data: series.M.totalCount,
          name: 'Male'
        },{
          type: 'column',
          data: series.F.totalCount,
          name: 'Female'
        }]
      },
      percent:{
        xAxis: {
          categories: years
        },
        series: [{
          type: 'column',
          data: series.A.percent,
          name: 'All'
        }, {
          type: 'column',
          data: series.M.percent,
          name: 'Male'
        },{
          type: 'column',
          data: series.F.percent,
          name: 'Female'
        }]
      },
      averageA: (series.A.sum / series.A.count),
      averageM: (series.M.sum / series.M.count),
      averageF: (series.F.sum / series.F.count)
    };
  }

  render(){
    const { currentCounty, diseases } = this.props;

    if(this.props.currentCounty){
      const { statistics } = this.props.currentCounty;
      let diseaseStats = statistics.filter((statistic) => statistic.diseaseId.name === "physical inactivity" );
      config = this.getConfigData(diseaseStats);
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
              <ol className="breadcrumb">
                  <li className="active">
                      <i className="fa fa-dashboard"></i> Dashboard
                  </li>
              </ol>
            </div>
          </div>
          <div className="row">
            <h2>{currentCounty.county.name}</h2>
            <div>
              {currentCounty.county.stateId.name}
              {currentCounty.county.isFavorite &&
                <span><FontAwesome
                className='fas fa-heart'
                name='heart'
              />
                <button id="markNonFavoriteButton" onClick={this.handleFavoriteButtonClick}> Mark as non favorite </button>
                </span>
              }
              {!currentCounty.county.isFavorite &&
                <span><FontAwesome
                className='fas fa-heart'
                name='heart'
              />
              <button id="markFavoriteButton" onClick={this.handleFavoriteButtonClick}> Mark as favorite </button>
              </span>
              }
            </div>
          </div>
          <div className="row">
            <ReactHighcharts config={config.totalCount}/>
          </div>
          <div class="row">
            <div class="col-lg-3 col-md-6">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xs-3">
                                <i class="fa fa-comments fa-5x"></i>
                            </div>
                            <div class="col-xs-9 text-right">
                                <div class="huge">{config.averageA}</div>
                                <div>Total Average</div>
                            </div>
                        </div>
                    </div>
                    <a href="#">
                        <div class="panel-footer">
                            <span class="pull-left">All</span>

                            <div class="clearfix"></div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="panel panel-green">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xs-3">
                                <i class="fa fa-tasks fa-5x"></i>
                            </div>
                            <div class="col-xs-9 text-right">
                                <div class="huge">{config.averageM}</div>
                                <div>Average</div>
                            </div>
                        </div>
                    </div>
                    <a href="#">
                        <div class="panel-footer">
                            <span class="pull-left">Male</span>
                            <div class="clearfix"></div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="panel panel-yellow">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xs-3">
                                <i class="fa fa-shopping-cart fa-5x"></i>
                            </div>
                            <div class="col-xs-9 text-right">
                                <div class="huge">{config.averageF}</div>
                                <div>Average</div>
                            </div>
                        </div>
                    </div>
                    <a href="#">
                        <div class="panel-footer">
                            <span class="pull-left">Female</span>
                            <div class="clearfix"></div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="panel panel-red">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xs-3">
                                <i class="fa fa-support fa-5x"></i>
                            </div>
                            <div class="col-xs-9 text-right">
                                <div class="huge">13</div>
                                <div>Support Tickets!</div>
                            </div>
                        </div>
                    </div>
                    <a href="#">
                        <div class="panel-footer">
                            <span class="pull-left">View Details</span>
                            <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                            <div class="clearfix"></div>
                        </div>
                    </a>
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
