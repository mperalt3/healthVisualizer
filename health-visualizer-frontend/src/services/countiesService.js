import Base from './base';

export const  getCounties = () => {
    return Base(`/counties`, {
      method: 'GET',
      params: {
        'isFavorite': false
      }
    })
      .then((response) => {
        if (response.status === 200){
          const { counties } = response.data;
          // console.log(counties);
          // console.log(typeof(counties))
          // console.log(counties[0]._id)
          return counties;
        }else{
          return [];
        }
      })
      .catch((err) => console.log(err));
  }
