import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../assets/images/logo.svg';
import '../assets/stylesheets/App.css';
import CountyDisplay from './countyDisplay';
import Nav from './nav';
import Landing from './landing'
import { updateVisibleLanding } from '../actions/index';

const mapStateToProps = state => {
  return {
    visibleLanding: state.visibleLanding
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateVisibleLanding: (visibleLanding) => dispatch(updateVisibleLanding(visibleLanding))
  };
};

class ConnectedApp extends Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.props.updateVisibleLanding(true);
  }

  render() {
    return (
      <div className="App">
          {this.props.visibleLanding && <Landing />}
        <div id="wrapper">
          <Nav/>
          <CountyDisplay />
        </div>
      </div>
    );
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);
export default App;
