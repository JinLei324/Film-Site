
import axios from 'axios';

export const API_ROOT = '';

const axiosInst = axios;

// axiosInst.interceptors.response.use((response) => {
//   let res = response;
//   console.log({ 'axiosResponse': response });
//   const tokentoSave = response.data.token;
//   const data = response.data;
  
//   if (response.status === 401) {
//     return window.location('/');
//   }
//   return response;
// });

// axiosInst.interceptors.request.use((request) => {
//   let res = request;
//   var AUTH_TOKEN = localStorage.getItem(defaultConfig.TOKEN);
//   axiosInst.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN;
//   console.log({ 'axiosRequest': request });
//   return request;
// });

export default axiosInst;
