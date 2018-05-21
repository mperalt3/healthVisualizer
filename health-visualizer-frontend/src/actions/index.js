import { LIST_STATES,
        LIST_DISEASES,
        LIST_COUNTIES,
        LIST_FAVORITES_COUNTIES,
        LIST_COUNTY_STATS,
        LIST_COUNTY,
        MARK_COUNTY_FAVORITE,
        MARK_COUNTY_NON_FAVORITE,
        UPDATE_SEARCH_NAME,
        SET_ELEMENTS_BY_PAGE
      } from "../constants/actionTypes";
import { getCounties, getCounty } from "../services/countiesService"


function actionListCounties(result) {
  return {
    type: LIST_COUNTIES,
    payload: result
  };
}

function actionListCounty(county) {
  return {
    type: LIST_COUNTY,
    payload: county
  };
}

export const listCounties = (searchName, limit, offset) => {
  return function (dispatch) {
    return getCounties(searchName, limit, offset).then(
      result => dispatch(actionListCounties(result))
    )
  }
}

export const listCounty = (countyId) => {
  return function (dispatch) {
    return getCounty(countyId).then(
      county => dispatch(actionListCounty(county))
    )
  }
}

export const updateSearchName = (searchName) => ({ type: UPDATE_SEARCH_NAME, payload: searchName });
export const setElementsByPage = (elementsByPage) => ({ type: SET_ELEMENTS_BY_PAGE, payload: elementsByPage });



export const listDiseases = () => ({ type: LIST_DISEASES });
export const listStates = () => (
  { type: LIST_STATES,
    payload: {name: "Estado1"} }
  );
export const listFavoriteCounties = () => ({ type: LIST_FAVORITES_COUNTIES });
export const listCountyStats = (countyId) => ({ type: LIST_COUNTY_STATS, payload: countyId });
export const markAsFavorite = (countyId) => ({ type: MARK_COUNTY_FAVORITE, payload: countyId });
export const markAsNonFavorite = (countyId) => ({ type: MARK_COUNTY_NON_FAVORITE, payload: countyId });
