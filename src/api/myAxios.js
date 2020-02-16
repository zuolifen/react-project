import axios from 'axios';
import qs from 'querystring';
import {message} from 'antd';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import {BASE_URL } from '../config';
axios.defaults.baseURL = BASE_URL;
//使用axios的请求拦截器
axios.interceptors.request.use((config) => {
    Nprogress.start();
    const {method,data} = config;
    if(method.toLocaleLowerCase() === 'post'&& data instanceof Object){
        config.data = qs.stringify(data);
        return config
    }
}
)
axios.interceptors.response.use(
    (response)=>{
        Nprogress.done();
        return response.data
    },
    (error)=>{
        Nprogress.done();
        message.error('请求失败请联系管理员！')
        return new Promise(()=>{})
    }
)

export default axios;