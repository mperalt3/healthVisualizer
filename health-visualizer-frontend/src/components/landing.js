import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';


class Landing extends Component {
  constructor(){
    super();
    this.state = {};
  }

  render(){
    return (
      <div className="landing">
        <div className="landing-section" id="welcome">
          <h1> Welcome to Health Visualizer </h1>
          <p> This site display information about indicators that affect metabolic syndrome </p>
          <div>
            <a href="" className="btn btn-info btn-lg landing-link" >Get starting</a>
            <a href="" className="btn btn-info btn-lg landing-link" >Learn more</a>
          </div>
        </div>
        <div className="landing-section" id="about">
          <h2> <FontAwesome
            className='fas fa-heartbeat'
            name='heartbeat'
          /> What is the metabolic syndrome? </h2>
          <p> the metabolic syndrome is... </p>
        </div>
        <div className="landing-section" id="source">
          <h2> Where it comes the data? <FontAwesome
            className='fal fa-map-globe'
            name='globe'
          /></h2>
          <p> The data used for the health visulizer come from... </p>
          <a href="" className="btn btn-info btn-lg landing-external-link">Learn more</a>
        </div>
      </div>
    )
  }
}


export default Landing;
