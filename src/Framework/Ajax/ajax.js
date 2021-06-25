import axios from 'axios'
import { Message } from 'element-ui'
import { getAppBaseUrl } from './host'
import { getLanguage } from '../../i18n/langs/index'

const service = axios.create({
  baseURL: getAppBaseUrl(),
  timeout: 30000
});

service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    // 设置请求的语言
    config.headers['locale'] = getLanguage();
    return config
  },
  error => {
    Promise.reject(error)
  }
);

service.interceptors.response.use(
  res => {
    let data = res.data || {};
    if (data.code === 200) {  // 临时
      return data
    } else {
      if(data.code === 508) {
        Message({
          message: data.msg,
          type: 'error',
          duration: 2 * 1000
        });
        return data
      }
      return Promise.reject(data)
    }
  },
  error => {
    let msg = ''
    let data = error.data || {}
    console.dir(error)
    if (error == 'Error: timeout of 5000ms exceeded') {
      msg = '无效请求！请求超时！'
    } else {
      msg = data.msg
    }
    // Message({
    //   message: msg,
    //   type: 'error',
    //   duration: 2 * 1000
    // });
    return Promise.reject(error)
  }
);
export default service