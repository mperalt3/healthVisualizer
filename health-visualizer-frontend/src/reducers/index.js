import { UPDATE_SEARCH_NAME,
          UPDATE_IS_FAVORITE,
          SET_ELEMENTS_BY_PAGE,
          LIST_COUNTIES,
          LIST_COUNTY
 } from "../constants/actionTypes";

const initialState = {
  counties: [],
  diseases: [],
  currentCounty: {},
  totalCounties: 0,
  searchName: '',
  elementsByPage: 1,
  isFavorite: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_NAME:
      return { ...state, searchName: action.payload };
    case UPDATE_IS_FAVORITE:
      return { ...state, isFavorite: action.payload };
    case SET_ELEMENTS_BY_PAGE:
      return { ...state, elementsByPage: action.payload };
    case LIST_COUNTIES:
      return { ...state, counties: action.payload.counties, totalCounties: action.payload.totalCounties}
    case LIST_COUNTY:
      return { ...state, currentCounty: action.payload}
    default:
      return state;
  }
};

export default rootReducer;
