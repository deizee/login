import axios from 'axios';
import API_ENV from '../config/api.config';

export async function getCities(counrtyId) {
  try {
    const response = await axios.get(`${API_ENV.apiUrl}/location/get-cities/${counrtyId}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }    
}