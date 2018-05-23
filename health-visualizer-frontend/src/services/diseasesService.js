import Base from './base';

// Consume healVisualizerApi diseases index.
export const  getDiseases = () => {
  return Base(`/diseases`, {
    method: 'GET'
  })
    .then((response) => {
      if (response.status === 200){
        const { diseases } = response.data;
        return diseases;
      }else{
        return [];
      }
    })
    .catch((err) => console.log(err));
  }
