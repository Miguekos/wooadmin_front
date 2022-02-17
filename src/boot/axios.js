import axios from "axios";
axios.defaults.withCredentials = false;
// import qs from "qs";
// import proxy from "http-proxy-middleware";
// // var proxy = require('http-proxy-middleware');
// proxy("/api", {
//   target: "http://127.0.0.1:3000",
//   changeOrigin: true, // needed for virtual hosted sites
//   // ws: true, // proxy websockets
//   pathRewrite: {
//     '^/api/': '', // rewrite path
//   },
// });
let URLs;
if (process.env.DEV) {
  // URLs = "http://95.111.235.214:8050"
  // URLs = "http://192.168.0.33:8050"
  // URLs = "http://192.168.1.2:8050";
  URLs = "https://api.apps.com.pe"
}

if (process.env.PRO) {
  // URLs = "https://api.apps.com.pe"
}
// Pdfs
const axiosInstancePdfs = axios.create({
  // paramsSerializer: params => {
  //   return qs.stringify(params, { arrayFormat: "repeat" });
  // },
  // proxy: {login
  //   host: '127.0.0.1',
  //   port: 9000
  // }
  // baseURL: "http://95.111.235.214:8050"
  // baseURL: "http://192.168.0.33:8050"
  // baseURL: "http://192.168.0.32:8050"
  // baseURL: "http://192.168.18.5:8050"
  // baseURL: "http://192.168.18.5:4545"
  baseURL: "https://api.apps.com.pe"
  // baseURL : URLs
});

// WooAdmin
const axiosInstance = axios.create({
  // paramsSerializer: params => {
  //   return qs.stringify(params, { arrayFormat: "repeat" });
  // },
  // proxy: {login
  //   host: '127.0.0.1',
  //   port: 9000
  // }
  // baseURL: "http://95.111.235.214:8050"
  // baseURL: "http://192.168.0.33:8050"
  // baseURL: "http://192.168.0.32:8050"
  // baseURL: "http://192.168.18.5:8050"
  baseURL: "https://api.apps.com.pe"
  // baseURL : URLs
});
// TexCargo
const axiosInstanceAPI = axios.create({
  // paramsSerializer: params => {
  //   return qs.stringify(params, { arrayFormat: "repeat" });
  // },
  // proxy: {login
  //   host: '127.0.0.1',
  //   port: 9000
  // }
  // baseURL: "http://95.111.235.214:8050"
  // baseURL: "http://192.168.0.33:8050"
  // baseURL: "http://192.168.0.32:8050"
  // baseURL: "http://192.168.18.5:9766"
  baseURL: "https://api.apps.com.pe"
  // baseURL : URLs
});
axiosInstanceAPI.defaults.headers.common["token"] = "2bacb1b1bbab2cc23122";

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance;
};

export { axiosInstance, axiosInstanceAPI, axiosInstancePdfs };
