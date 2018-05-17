import { LIST_STATES,
          LIST_COUNTIES
 } from "../constants/actionTypes";
import { getCounties } from "../services/countiesService"
const initialState = {
  counties: [
    {_id: 1, name: "Chambers county"},
    {_id: 2, name: "Clay county"}
  ],
  states: [],
  diseases: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_STATES:
      return { ...state,states: [...state.states, "Nuevo estado"] };
    case LIST_COUNTIES:
      const counties = getCounties();
      console.log("reducers counties:" + counties)
      return { ...state, counties: [...state.counties, counties]}
    default:
      return state;
  }
};

export default rootReducer;
