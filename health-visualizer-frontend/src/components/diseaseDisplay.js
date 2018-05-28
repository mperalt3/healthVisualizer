import React, { Component } from "react";
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
            <div class="col-lg-12">
              <div className="disease-title">
                <h3>{diseaseName}</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div class="col-lg-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title"><i class="fa fa-bar-chart-o fa-fw"></i>Total Cases by year</h3>
                </div>
                <div class="panel-body">
                  <ReactHighcharts config={dataCharts.totalCountChart}/>
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
                                <div class="huge">{dataCharts.averageA}</div>
                                <div>Cases by year</div>
                            </div>
                        </div>
                    </div>
                    <a href="#" onClick={this.handleClick}>
                        <div class="panel-footer">
                            <span class="pull-left">Total average</span>

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
                                <div class="huge">{isNaN(dataCharts.averageM) ? "No data available" : dataCharts.averageM}</div>
                                <div>Cases by year</div>
                            </div>
                        </div>
                    </div>
                    <a href="#" onClick={this.handleClick}>
                        <div class="panel-footer">
                            <span class="pull-left">Male average</span>
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
                                <div class="huge">{isNaN(dataCharts.averageF) ? "No data available" : dataCharts.averageF}</div>
                                <div>Cases by year</div>
                            </div>
                        </div>
                    </div>
                    <a href="#" onClick={this.handleClick}>
                        <div class="panel-footer">
                            <span class="pull-left">Female average</span>
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
                <h3 class="panel-title"><i class="fa fa-bar-chart-o fa-fw"></i> Female vs Male percentage of cases</h3>
              </div>
              {isNaN(dataCharts.averageM) &&
              <div class="panel-body">
                No data available
              </div>
              }
              {!isNaN(dataCharts.averageM) &&
              <div class="panel-body">
                <ReactHighcharts config={dataCharts.averagePercentChart}/>
              </div>
              }
            </div>
          </div>
          <div class="col-lg-7">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title"><FontAwesome
                  className='fa fa-bar-chart-o fa-fw"'
                  name='chart'
                /> Percentage by year</h3>
              </div>
              <div class="panel-body">
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
