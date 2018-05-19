import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { counties: state.counties };
};

class ConnectedMenu extends Component {
  constructor(){
    super();
    this.state = {};
  }

  // renderCounties(counties){
  //   let result = "";
  //   if (counties){
  //     counties.forEach(county => {
  //       result << <ul className="list-group list-group-flush">
  //       {counties.map(el => (
  //         <li className="list-group-item" key={el._id}>
  //         {el.name}
  //         </li>
  //       ))}
  //       </ul>
  //     });
  //   }
  //   return result;
  // }


  render(){
    const { counties } = this.props;
    console.log("menu ")
    console.log(counties)
    return (
      <div>
      {counties &&
        <div>
        {counties.map(el => (
          <li className="list-group-item" key={el._id}>
          {el.name}
          </li>
        ))}
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
