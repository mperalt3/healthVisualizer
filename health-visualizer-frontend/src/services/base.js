import axios from 'axios';
import { healthVisualizerApi } from '../config/globals';

export default function(url, customOptions = {}) {
  const options = {
    url: `${healthVisualizerApi}${url}`,
    ...customOptions,
  };

  return axios({ ...options });
}
