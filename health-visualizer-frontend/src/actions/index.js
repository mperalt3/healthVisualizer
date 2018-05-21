import {  LIST_DISEASES,
          LIST_COUNTIES,
          LIST_COUNTY,
          MARK_COUNTY_FAVORITE,
          MARK_COUNTY_NON_FAVORITE,
          UPDATE_SEARCH_NAME,
          UPDATE_IS_FAVORITE,
          SET_ELEMENTS_BY_PAGE
      } from "../constants/actionTypes";
import { getCounties, getCounty } from "../services/countiesService"

export const updateSearchName = (searchName) => ({ type: UPDATE_SEARCH_NAME, payload: searchName });
export const updateIsFavorite = (isFavorite) => ({ type: UPDATE_IS_FAVORITE, payload: isFavorite });
export const setElementsByPage = (elementsByPage) => ({ type: SET_ELEMENTS_BY_PAGE, payload: elementsByPage });

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

export const listCounties = (searchName, isFavorite, limit, offset) => {
  return function (dispatch) {
    return getCounties(searchName, isFavorite, limit, offset).then(
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


export const listDiseases = () => ({ type: LIST_DISEASES });
export const markAsFavorite = (countyId) => ({ type: MARK_COUNTY_FAVORITE, payload: countyId });
export const markAsNonFavorite = (countyId) => ({ type: MARK_COUNTY_NON_FAVORITE, payload: countyId });
