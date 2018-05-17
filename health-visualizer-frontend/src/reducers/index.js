import { LIST_STATES } from "../constants/actionTypes";

const initialState = {
  counties: [],
  states: [],
  diseases: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_STATES:
      return { ...state,states: [...state.states, "Nuevo estado"] };
    default:
      return state;
  }
};

export default rootReducer;
