import { LIST_STATES } from "../constants/actionTypes";

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
    default:
      return state;
  }
};

export default rootReducer;
