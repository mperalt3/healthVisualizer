import Base from './base';

// Consume healVisualizerApi counties index. Support search, pagination and mark as favorite
export const  getCounties = (searchName, isFavorite, limit, offset) => {
  let params = {
    limit: limit,
    offset: offset,
    isFavorite: isFavorite
  };
  if (searchName) { params.searchName = searchName }
  return Base(`/counties`, {
    method: 'GET',
    params: params
  })
    .then((response) => {
      if (response.status === 200){
        const { counties, totalCounties } = response.data;
        return { counties, totalCounties };
      }else{
        return [];
      }
    })
    .catch((err) => console.log(err));
  }

// Consume healVisualizerApi counties show by countyId with statistics
export const  getCounty = (countyId) => {
  return Base(`/counties/${countyId}/statistics`, {
    method: 'GET'
  })
    .then((response) => {
      if (response.status === 200){
        const { result } = response.data;
        return result;
      }else{
        return {};
      }
    })
    .catch((err) => console.log(err));
}
