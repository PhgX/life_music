import axios from "axios";

const TOKEN = localStorage.getItem('access_token')

const apiClient = axios.create({
  baseURL: "http://localhost:3008/api",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${TOKEN} `
  },
});
// Add a request interceptor
apiClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response) {
 
    return response.data;

  },
  function (error) {
    const {status, data} = error.response;
    if(status === 400) {
      const errorList = data || [];

      const array = Object.values(errorList);
      const firstError = (array.length > 0) ? array[0] : {} ;
      console.log(errorList)
      throw new Error(firstError)
    }
    return Promise.reject(error);
  }
);
export default apiClient;