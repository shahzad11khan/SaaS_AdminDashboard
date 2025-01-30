// fetchData.js
import axios from 'axios';
const fetchData = async (url, method = 'GET', data = {}) => {
  try {
    const config = {
      method,   
      url,      
      data,
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw new Error('Failed to fetch data');
  }
};

export default fetchData;
