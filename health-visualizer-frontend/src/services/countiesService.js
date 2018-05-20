import Base from './base';

export const  getCounties = (searchName, limit, offset) => {
  let params = {
    limit: limit,
    offset: offset
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

export const  getCounty = (countyId) => {
  return Base(`/counties/${countyId}/statistics`, {
    method: 'GET'
  })
    .then((response) => {
      if (response.status === 200){
        const { result } = response.data;
        console.log(result)
        return result;
      }else{
        return {};
      }
    })
    .catch((err) => console.log(err));
}

  // export const  getCounties = () => {
  //     return Base(`/counties`, {
  //       method: 'GET',
  //       params: {
  //         'isFavorite': false
  //       }
  //     })
  //       .then((response) => {
  //         if (response.status === 200){
  //           const { counties } = response.data;
  //           // console.log(counties);
  //           // console.log(typeof(counties))
  //           // console.log(counties[0]._id)
  //           return counties;
  //         }else{
  //           return [];
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
