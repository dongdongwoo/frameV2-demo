import Axios from "axios";

import { API_SERVER_BASE_URL } from "./url";

const headers = {
  "Content-Type": "application/json",
};

export const axios = Axios.create({
  baseURL: API_SERVER_BASE_URL,
  timeout: 15000,
  headers: headers,
});

axios.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    console.log("request error");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    console.log("\n========== axios response ==========");
    console.log(res.request.responseURL);
    console.log(res.data);
    return Promise.resolve(res.data);
  },
  (error) => {
    console.log("########## axios error ##########");
    console.log(error.request.responseURL);
    console.log(error.response.data);
    return Promise.reject(error);
  }
);
