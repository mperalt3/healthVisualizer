import React, { Component } from "react";
import { connect } from "react-redux";
import CountyOption from "./countyOption";
import Paginator from "./paginator";
import { setElementsByPage, listCounties, updateIsFavorite } from "../actions/index";

const mapStateToProps = state => {
  return {
    counties: state.counties
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listCounties: (searchName, isFavorite, limit, offset) => dispatch(listCounties(searchName, isFavorite, limit, offset)),
    setElementsByPage: (elementsByPage) => dispatch(setElementsByPage(elementsByPage)),
    updateIsFavorite: (isFavorite) => dispatch(updateIsFavorite(isFavorite))
  };
};

class ConnectedMenu extends Component {
  constructor(){
    super();
    this.state = { };
  }

  componentDidMount(){
    const elementsByPage = 10;
    const isFavorite = false;
    this.props.setElementsByPage(elementsByPage);
    this.props.listCounties(null, isFavorite, elementsByPage, 0);
    this.props.updateIsFavorite(isFavorite);
  }

  render(){
    const { counties } = this.props;
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
