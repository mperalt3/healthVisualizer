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
          console.log(counties);
          return counties;
        }else{
          return [];
        }
      })
      .catch((err) => console.log(err));
  }
