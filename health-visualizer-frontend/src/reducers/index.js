import { LIST_STATES,
          LIST_COUNTIES,
          LIST_COUNTY
 } from "../constants/actionTypes";

const initialState = {
  counties: [
    {_id: 1, name: "Chambers county"},
    {_id: 2, name: "Clay county"}
  ],
  states: [],
  diseases: [],
  currentCounty: {}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_STATES:
      return { ...state,states: [...state.states, "Nuevo estado"] };
    case LIST_COUNTIES:
      return { ...state, counties: action.payload}
    case LIST_COUNTY:
      return { ...state, currentCounty: action.payload}
    default:
      return state;
  }
};

export default rootReducer;
