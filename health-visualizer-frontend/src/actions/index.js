import { LIST_STATES,
        LIST_DISEASES,
        LIST_COUNTIES,
        LIST_FAVORITES_COUNTIES,
        LIST_COUNTY_STATS,
        MARK_COUNTY_FAVORITE,
        MARK_COUNTY_NON_FAVORITE
      } from "../constants/actionTypes";
import { getCounties } from "../services/countiesService"

export const listStates = () => (
  { type: LIST_STATES,
    payload: {name: "Estado1"} }
 );

 function actionListCounties(counties) {
  return {
    type: LIST_COUNTIES,
    payload: counties
  };
}

export const listDiseases = () => ({ type: LIST_DISEASES });

export const listCounties3 = () => {
  return function (dispatch) {
    return getCounties().then(
      counties => dispatch(actionListCounties(counties))
    )
  }
};
export const listCounties2 = () => (
  { type: LIST_COUNTIES,
    payload: new Promise(() => {
     const counties = getCounties();
     console.log("actions")
     console.log(counties)
     return counties }).then((counties)=>{return counties})
  }
);
export const listCounties = () => (
  { type: LIST_COUNTIES,
    payload: {_id: 1, name: "Nuevo condado"}
   }
);
export const listFavoriteCounties = () => ({ type: LIST_FAVORITES_COUNTIES });
export const listCountyStats = (countyId) => ({ type: LIST_COUNTY_STATS, payload: countyId });
export const markAsFavorite = (countyId) => ({ type: MARK_COUNTY_FAVORITE, payload: countyId });
export const markAsNonFavorite = (countyId) => ({ type: MARK_COUNTY_NON_FAVORITE, payload: countyId });
