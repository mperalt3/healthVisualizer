import React, { Component } from "react";
import { connect } from "react-redux";
import CountyOption from "./countyOption";
import Paginator from "./paginator";
import { setElementsByPage, listCounties } from "../actions/index";

const mapStateToProps = state => {
  return { counties: state.counties };
};

const mapDispatchToProps = dispatch => {
  return {
    listCounties: (searchName, limit, offset) => dispatch(listCounties(searchName, limit, offset)),
    setElementsByPage: (elementsByPage) => dispatch(setElementsByPage(elementsByPage))
  };
};

class ConnectedMenu extends Component {
  constructor(){
    super();
    this.state = { };
  }

  componentDidMount(){
    console.log("Montando menu")
    const elementsByPage = 10;
    this.props.setElementsByPage(elementsByPage);
    this.props.listCounties(null, elementsByPage, 0);
    console.log("Menu montado")
  }

  render(){
    const { counties } = this.props;
    console.log("menu ")
    console.log(counties)
    return (
      <div>
      {counties &&
        <div>
        {counties.map(el => (
          <CountyOption county={el}/>
        ))}
        <Paginator />
        </div>
      }
      { !counties &&
        <h2>No counties</h2>
      }
      </div>
    )
  }
}


const Menu = connect(mapStateToProps, mapDispatchToProps)(ConnectedMenu);
export default Menu;
