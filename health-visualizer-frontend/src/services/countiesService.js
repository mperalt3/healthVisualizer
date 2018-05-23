import Base from './base';

// Consume healVisualizerApi counties index. Support search, pagination and mark as favorite
export const  getCounties = (searchName, isFavorite, limit, offset) => {
  let params = {
    limit: limit,
    offset: offset
  };
  if (searchName) { params.searchName = searchName }
  if (isFavorite) { params.isFavorite = isFavorite }
  console.log("Buscar counties")
  return Base(`/counties`, {
    method: 'GET',
    params: params
  })
    .then((response) => {
      if (response.status === 200){
        console.log("counties encontrados")
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

// Consume healVisualizerApi counties update by countyId
export const  updateCounty = (countyId, isFavorite) => {
  console.log("Actualizar condado")
  return Base(`/counties/${countyId}`, {
    method: 'PUT',
    data: {
      isFavorite: isFavorite.toString()
    }
  })
    .then((response) => {
      if (response.status === 200){
        const { county } = response.data;
        console.log("condado actualizado")
        return county;
      }else{
        console.log(response)
        return {};
      }
    })
    .catch((err) => console.log(err));
}
