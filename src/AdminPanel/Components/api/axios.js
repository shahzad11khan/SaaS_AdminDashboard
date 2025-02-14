// // fetchData.js
// import axios from 'axios';
// const fetchData = async (url, method = 'GET', data = {}) => {
//   try {
//     const config = {
//       url,      
//       method,   
//       data,
//     };
//     const response = await axios(config);
//     return response.data;
//   } catch (error) {
//     return error
//   }
// };

// export default fetchData;

import axios from "axios";

const fetchData = async (url, method = "GET", data = {}, params = {}) => {
  try {
    const config = {
      url,
      method,
      ...(method !== "GET" && { data }), // Only include `data` for non-GET requests
      params, // Add query parameters for filtering, sorting, pagination, etc.
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    // console.log()
    return (error?.response );
  }
};

export default fetchData;
