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
              <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-comments fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">26</div>
                                        <div>New Comments!</div>
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
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-green">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-tasks fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">12</div>
                                        <div>New Tasks!</div>
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
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-yellow">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-shopping-cart fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">124</div>
                                        <div>New Orders!</div>
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
