import { LIST_STATES,
        LIST_DISEASES,
        LIST_COUNTIES,
        LIST_FAVORITES_COUNTIES,
        LIST_COUNTY_STATS,
        LIST_COUNTY,
        MARK_COUNTY_FAVORITE,
        MARK_COUNTY_NON_FAVORITE
      } from "../constants/actionTypes";
import { getCounties, getCounty } from "../services/countiesService"


function actionListCounties(counties) {
  return {
    type: LIST_COUNTIES,
    payload: counties
  };
}

function actionListCounty(county) {
  return {
    type: LIST_COUNTY,
    payload: county
  };
}

export const listCounties = () => {
  return function (dispatch) {
    return getCounties().then(
      counties => dispatch(actionListCounties(counties))
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
export const listStates = () => (
  { type: LIST_STATES,
    payload: {name: "Estado1"} }
  );
export const listFavoriteCounties = () => ({ type: LIST_FAVORITES_COUNTIES });
export const listCountyStats = (countyId) => ({ type: LIST_COUNTY_STATS, payload: countyId });
export const markAsFavorite = (countyId) => ({ type: MARK_COUNTY_FAVORITE, payload: countyId });
export const markAsNonFavorite = (countyId) => ({ type: MARK_COUNTY_NON_FAVORITE, payload: countyId });
