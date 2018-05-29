import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import FontAwesome from 'react-fontawesome';

let dataCharts ={
  totalCountChart: { chart: { type: 'column' }, xAxis: { categories: [] }, series: [], title: {text: ''} },
  percentChart: { chart: { type: 'column' }, xAxis: { categories: [] }, series: [], title: {text: ''} },
  averagePercentChart: { chart: { type: 'column' }, xAxis: { categories: [] }, series: [], title: {text: ''} },
  averageA: 0,
  averageM: 0,
  averageF: 0
}

// Component responsible for rendering all charts and data related to a county and a specific disease
class DiseaseDisplay extends Component {
  constructor(){
    super();
    this.state = {};
    this.handleClick= this.handleClick.bind(this);
  }

  handleClick(event){
    event.preventDefault();
  }

  render(){
    const { propsDataCharts, diseaseName } = this.props;
     dataCharts = propsDataCharts;

    return (
      <div>
          <div className="row">
            <div className="col-lg-12">
              <div className="disease-title">
                <h3>{diseaseName}</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title"><i className="fa fa-bar-chart-o fa-fw"></i>Total Cases by Year</h3>
                </div>
                <div className="panel-body">
                  <ReactHighcharts config={dataCharts.totalCountChart}/>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-3">
                              <FontAwesome
                                className='fas fa-users fa-4x'
                                name='users'
                              />
                            </div>
                            <div className="col-xs-9 text-right">
                                <div className="huge">{dataCharts.averageA}</div>
                                <div>Cases by year</div>
                            </div>
                        </div>
                    </div>
                    <a href="/" onClick={this.handleClick}>
                        <div className="panel-footer">
                            <span className="pull-left">Total Average</span>

                            <div className="clearfix"></div>
                        </div>
                    </a>
                </div>
            </div>
            <div className="col-lg-4 col-md-6">
                <div className="panel panel-green">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-3">
                            <FontAwesome
                              className='fas fa-mars fa-4x'
                              name='mars'
                            />
                            </div>
                            <div className="col-xs-9 text-right">
                                <div className="huge">{isNaN(dataCharts.averageM) ? "No data available" : dataCharts.averageM}</div>
                                <div>Cases by year</div>
                            </div>
                        </div>
                    </div>
                    <a href="/" onClick={this.handleClick}>
                        <div className="panel-footer">
                            <span className="pull-left">Male Average</span>
                            <div className="clearfix"></div>
                        </div>
                    </a>
                </div>
            </div>
            <div className="col-lg-4 col-md-6">
                <div className="panel panel-purple">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-3">
                            <FontAwesome
                              className='fas fa-venus fa-4x'
                              name='venus'
                            />
                            </div>
                            <div className="col-xs-9 text-right">
                                <div className="huge">{isNaN(dataCharts.averageF) ? "No data available" : dataCharts.averageF}</div>
                                <div>Cases by year</div>
                            </div>
                        </div>
                    </div>
                    <a href="/" onClick={this.handleClick}>
                        <div className="panel-footer">
                            <span className="pull-left">Female Average</span>
                            <div className="clearfix"></div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div className="row">
          <div className="col-lg-5">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title"><i className="fa fa-bar-chart-o fa-fw"></i> Female vs Male: Percentage of Cases</h3>
              </div>
              {isNaN(dataCharts.averageM) &&
              <div className="panel-body">
                No data available
              </div>
              }
              {!isNaN(dataCharts.averageM) &&
              <div className="panel-body">
                <ReactHighcharts config={dataCharts.averagePercentChart}/>
              </div>
              }
            </div>
          </div>
          <div className="col-lg-7">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title"><FontAwesome
                  className='fa fa-bar-chart-o fa-fw"'
                  name='chart'
                /> Percentage by Year</h3>
              </div>
              <div className="panel-body">
                <ReactHighcharts config={dataCharts.percentChart}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DiseaseDisplay;
