import { LIST_STATES,
        LIST_DISEASES,
        LIST_COUNTIES,
        LIST_COUNTY_STATS,
        MARK_COUNTY_FAVORITE,
        MARK_COUNTY_NON_FAVORITE
        } from "../constants/action-types";

export const listStates = () => ({ type: LIST_STATES });
export const listDiseases = () => ({ type: LIST_DISEASES });
export const listCounties = () => ({ type: LIST_COUNTIES });
export const listCountyStats = (countyId) => ({ type: LIST_COUNTY_STATS, payload: countyId });
export const markAsFavorite = (countyId) => ({ type: MARK_COUNTY_FAVORITE, payload: countyId });
export const markAsNonFavorite = (countyId) => ({ type: MARK_COUNTY_NON_FAVORITE, payload: countyId });
