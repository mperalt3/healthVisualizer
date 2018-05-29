import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/stylesheets/App.css';
import CountyDisplay from './countyDisplay';
import Nav from './nav';
import Landing from './landing';
import ErrorContainer from './error';
import { updateVisibleLanding } from '../actions/index';

const mapStateToProps = state => {
  return {
    visibleLanding: state.visibleLanding,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateVisibleLanding: (visibleLanding) => dispatch(updateVisibleLanding(visibleLanding))
  };
};

// Main component and the app point of start. It's responsible for displaying the landing or the dashboard
class ConnectedApp extends Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.props.updateVisibleLanding(true);
  }

  render() {
    console.log(this.props.error)
    return (
      <div className="App">
        {!this.props.error &&
          <div>
              {this.props.visibleLanding && <Landing />}
            <div id="wrapper">
              <Nav/>
              <CountyDisplay />
            </div>
          </div>
        }
        {this.props.error && <ErrorContainer />
        }
      </div>
    );
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);
export default App;
