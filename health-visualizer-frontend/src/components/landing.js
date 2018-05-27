import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';
import { DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { updateVisibleLanding } from "../actions/index";

const mapDispatchToProps = dispatch => {
  return {
    updateVisibleLanding: (visibleLanding) => dispatch(updateVisibleLanding(visibleLanding))
  };
};

class ConnectedLanding extends Component {
  constructor(){
    super();
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    this.handleClickUp = this.handleClickUp.bind(this);
  }

  componentDidMount(){
    Events.scrollEvent.register('begin', function() {});
    Events.scrollEvent.register('end', function() {});
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  handleClick(event){
    event.preventDefault();
    if (event.target.id == "learn more"){
      this.scrollToAbout();
    }else{
      this.props.updateVisibleLanding(false);
    }
  }

  handleClickUp(event){
    event.preventDefault();
    this.scrollToTop();
  }

  scrollToTop() {
    scroll.scrollToTop({
      smooth: "easeInQuads",
      delay: 80
    });
  }

  scrollToAbout(){
    scroller.scrollTo('About', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -120
    });
  }

  render(){
    return (
      <div className="landing" >
        <div className="landing-section" id="welcome">
          <h1> Welcome to Health Visualizer </h1>
          <p> This site display information about indicators that affect metabolic syndrome </p>
          <div>
            <a href="" className="btn btn-info btn-lg landing-link" id="getting started" onClick={this.handleClick} >Getting started</a>
            <a href="" className="btn btn-info btn-lg landing-link" id="learn more" onClick={this.handleClick}>Learn more</a>
          </div>
        </div>
        <div className="landing-section" id="about">
          <Element name="About"></Element>
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
          <a href="" className="btn btn-info btn-lg landing-external-link">Go to Data Source</a>
        </div>
        <div className="up-arrow" id="up">
          <a  onClick={this.handleClickUp} ><FontAwesome
            className='fa fa-arrow-up'
            name='arrow-up'
          /></a>
        </div>
      </div>
    )
  }
}

const Landing = connect(null, mapDispatchToProps)(ConnectedLanding);
export default Landing;
