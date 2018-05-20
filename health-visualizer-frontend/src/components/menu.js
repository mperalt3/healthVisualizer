import React, { Component } from "react";
import { connect } from "react-redux";
import CountyOption from "./countyOption";
import Paginator from "./paginator";

const mapStateToProps = state => {
  return { counties: state.counties };
};

class ConnectedMenu extends Component {
  constructor(){
    super();
    this.state = {
      elementsByPage: 10
    };
  }


  render(){
    const { counties } = this.props;
    const { elementsByPage } = this.state;
    console.log("menu ")
    console.log(counties)
    return (
      <div>
      {counties &&
        <div>
        {counties.map(el => (
          <CountyOption county={el}/>
        ))}
        <Paginator totalCount={counties.length} elementsByPage={elementsByPage}/>
        </div>
      }
      { !counties &&
        <h2>No counties</h2>
      }
      </div>
    )
  }
}


const Menu = connect(mapStateToProps, null)(ConnectedMenu);
export default Menu;
