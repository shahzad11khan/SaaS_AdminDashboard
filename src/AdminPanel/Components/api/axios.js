import axios from "axios";

const fetchData = async (url, method = "GET", data = {}, params = {}) => {

  try {
    const config = {
      url,
      method,
      ...(method !== "GET" && { data }), 
      params,  
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    const response = await axios(config);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default fetchData;
