import Base from './base';

// Consume healVisualizerApi counties index. Support search, pagination and mark as favorite
export const  getCounties = (searchName, isFavorite, limit, offset) => {
  let params = {
    limit: limit,
    offset: offset
  };
  if (searchName) { params.searchName = searchName }
  if (isFavorite) { params.isFavorite = isFavorite }
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
    .catch((err) =>{
      console.log(err);
      throw new Error("connection failed");
    });
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
    .catch((err) => {
      console.log(err);
      return {}
    });
}

// Consume healVisualizerApi counties update by countyId
export const  updateCounty = (countyId, isFavorite) => {
  return Base(`/counties/${countyId}`, {
    method: 'PUT',
    data: {
      isFavorite: isFavorite.toString()
    }
  })
    .then((response) => {
      if (response.status === 200){
        const { county } = response.data;
        return county;
      }else{
        return {};
      }
    })
    .catch((err) => console.log(err));
}
