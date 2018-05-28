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
          <p> Health Visulizer dashboard allows you to navigate through indicators on the health of the United States population over the past few years.</p>
          <p> These indicators are direct factors or consequences of the metabolic syndrome.</p>
          <p> You will compare information from year to year, gender by gender, or even select
            what data seems more important for others to view with the "mark as a favorite" option </p>
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
          <p> The metabolic syndrome is a set of conditions that occur together, but even one, can increase the risk of serious diseases such as diabetes,
          heart attacks and strokes.</p>
          <p> The importance of understanding what this syndrome is, is to prevent diseases that are the main causes of death today </p>
        </div>
        <div className="landing-section" id="source">
          <h2> Where the data comes from? <FontAwesome
            className='fal fa-map-globe'
            name='globe'
          /></h2>
          <p> The Centers for Disease Control and Prevention (CDC) of USA has per-country indicators since 2004 and up until 2013. </p>
          <p>With Health Visualizer you can explore the data easier, but you can still find all the information on it's webpage. </p>
          <a href="https://www.cdc.gov/diabetes/data/countydata/countydataindicators.html" className="btn btn-info btn-lg landing-external-link">Go to CDC</a>
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
