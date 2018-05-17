import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { counties: state.counties };
};

const ConnectedMenu = ({ counties }) => (
  <ul className="list-group list-group-flush">
    {counties.map(el => (
      <li className="list-group-item" key={el._id}>
        {el.name}
      </li>
    ))}
  </ul>
);

const Menu = connect(mapStateToProps)(ConnectedMenu);
export default Menu;
