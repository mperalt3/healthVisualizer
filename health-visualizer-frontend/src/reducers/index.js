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
      console.log("reducer")
      console.log(state)
      return { ...state, counties: action.payload}
    default:
      return state;
  }
};

export default rootReducer;
