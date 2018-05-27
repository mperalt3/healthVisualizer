import React, { Component } from "react";
import { connect } from "react-redux";
import ReactHighcharts from 'react-highcharts';

class Chart extends Component {
  constructor(){
    super();
    this.state = { };
  }

  componentDidMount(){
  }

  render(){
    const { config } = this.props;
    return (
      <ReactHighcharts config={this.config}/>
    )
  }
}

export default Chart;
