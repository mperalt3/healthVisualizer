import { UPDATE_SEARCH_NAME,
          UPDATE_IS_FAVORITE,
          UPDATE_OFFSET,
          UPDATE_VISIBLE_LANDING,
          SET_ELEMENTS_BY_PAGE,
          SET_ERROR,
          LIST_COUNTIES,
          LIST_COUNTY,
          LIST_DISEASES,
          MARK_COUNTY_FAVORITE,
          MARK_COUNTY_NON_FAVORITE
 } from "../constants/actionTypes";

const initialState = {
  counties: [],
  diseases: [],
  currentCounty: {},
  totalCounties: 0,
  searchName: '',
  elementsByPage: 1,
  isFavorite: false,
  visibleLanding: true,
  offset: 0,
  error: false
};

// App principal reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_NAME:
      return { ...state, searchName: action.payload };
    case UPDATE_IS_FAVORITE:
      return { ...state, isFavorite: action.payload };
    case UPDATE_OFFSET:
      return { ...state, offset: action.payload };
    case UPDATE_VISIBLE_LANDING:
      return { ...state, visibleLanding: action.payload };
    case SET_ELEMENTS_BY_PAGE:
      return { ...state, elementsByPage: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case LIST_COUNTIES:
      return { ...state, counties: action.payload.counties, totalCounties: action.payload.totalCounties};
    case LIST_COUNTY:
      return { ...state, currentCounty: action.payload};
    case LIST_DISEASES:
      return { ...state, diseases: action.payload};
    case MARK_COUNTY_FAVORITE:
      return { ...state, currentCounty: { county: action.payload, statistics: state.currentCounty.statistics }};
    case MARK_COUNTY_NON_FAVORITE:
      return { ...state, currentCounty: { county: action.payload, statistics: state.currentCounty.statistics }};
    default:
      return state;
  }
};

export default rootReducer;
