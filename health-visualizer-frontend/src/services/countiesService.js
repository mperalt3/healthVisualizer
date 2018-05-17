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
          console.log(response.data);
          return [{_id: 1, name: "county1"}, {_id: 2, name: "county2"}];
        }else{
          return [];
        }
      })
      .catch((err) => console.log(err));
  }
