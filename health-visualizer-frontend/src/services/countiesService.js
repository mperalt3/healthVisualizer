import Base from './base';

export const  getCounties = () => {
  return Base(`/counties`, {
    method: 'GET'
  })
    .then((response) => {
      if (response.status === 200){
        const { counties } = response.data;
        return counties;
      }else{
        return [];
      }
    })
    .catch((err) => console.log(err));
  }

export const  getCounty = (countyId) => {
  return Base(`/counties/${countyId}`, {
    method: 'GET'
  })
    .then((response) => {
      if (response.status === 200){
        const { county } = response.data;
        console.log(county)
        return county;
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
