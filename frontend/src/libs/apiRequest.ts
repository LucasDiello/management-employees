import axios from "axios";

const url = process.env.REACT_APP_API_URL_LOCAL || process.env.REACT_APP_API_URL_PROD;
console.log(url )
export const apiRequest = axios.create({
    baseURL: url,
    withCredentials: true,
  });
  