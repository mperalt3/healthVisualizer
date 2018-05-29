import {  LIST_DISEASES,
          LIST_COUNTIES,
          LIST_COUNTY,
          MARK_COUNTY_FAVORITE,
          MARK_COUNTY_NON_FAVORITE,
          UPDATE_SEARCH_NAME,
          UPDATE_IS_FAVORITE,
          UPDATE_OFFSET,
          UPDATE_VISIBLE_LANDING,
          SET_ELEMENTS_BY_PAGE,
          SET_ERROR
      } from "../constants/actionTypes";
import { getCounties, getCounty, updateCounty } from "../services/countiesService"
import { getDiseases } from "../services/diseasesService"

// Update searchName, isFavorite, offset, visibleLanding, error and elementsByPage in store in order to be available for any component at any time.
export const updateSearchName = (searchName) => ({ type: UPDATE_SEARCH_NAME, payload: searchName });
export const updateIsFavorite = (isFavorite) => ({ type: UPDATE_IS_FAVORITE, payload: isFavorite });
export const updateOffset = (offset) => ({ type: UPDATE_OFFSET, payload: offset });
export const updateVisibleLanding = (visibleLanding) => ({ type: UPDATE_VISIBLE_LANDING, payload: visibleLanding });
export const setElementsByPage = (elementsByPage) => ({ type: SET_ELEMENTS_BY_PAGE, payload: elementsByPage });
export const setError = (error) => ({ type: SET_ERROR, payload: error });

// Return a plain object as action for the reducer after async calls. Actions: markAsFavorite, markAsNonFavorite, listDiseases, listCounties and lisCounty
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

function actionListDiseases(diseases) {
  return {
    type: LIST_DISEASES,
    payload: diseases
  };
}

function actionMarkAsFavorite(county) {
  return {
    type: MARK_COUNTY_FAVORITE,
    payload: county
  };
}

function actionMarkAsNonFavorite(county) {
  return {
    type: MARK_COUNTY_NON_FAVORITE,
    payload: county
  };
}

// Async function that waits results from Counties Service. Get all counties.
export const listCounties = (searchName, isFavorite, limit, offset) => {
  return function (dispatch) {
    return getCounties(searchName, isFavorite, limit, offset).then(
      result => dispatch(actionListCounties(result))
    ).catch(
      err => dispatch(setError(err))
    )
  }
}

// Async function that waits results from Counties Service. Get a specific county and it's statistics.
export const listCounty = (countyId) => {
  return function (dispatch) {
    return getCounty(countyId).then(
      county => dispatch(actionListCounty(county))
    )
  }
}

// Async function that waits results from Diseases Service. Get all diseases.
export const listDiseases = () => {
  return function (dispatch) {
    return getDiseases().then(
      diseases => dispatch(actionListDiseases(diseases))
    )
  }
}

// Async function that waits results from Counties Service. Update county as favorite.
export const markAsFavorite = (countyId, searchName, isFavorite, elementsByPage, offset) => {
  return function (dispatch) {
    return updateCounty(countyId, true).then(
      county => dispatch(actionMarkAsFavorite(county))
    ).then(
      () => dispatch(listCounties(searchName, isFavorite, elementsByPage, offset))
    )
  }
}

// Async function that waits results from Counties Service. Update county as non favorite.
export const markAsNonFavorite = (countyId, searchName, isFavorite, elementsByPage, offset) => {
  return function (dispatch) {
    return updateCounty(countyId, false).then(
      county => dispatch(actionMarkAsNonFavorite(county))
    ).then (
      () => dispatch(listCounties(searchName, isFavorite, elementsByPage, offset))
    )
  }
}
