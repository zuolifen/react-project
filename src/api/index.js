import myAxios from './myAxios';
import jsonp from 'jsonp'
import {message} from 'antd';
import {WEATHER_BASE_URL,WEATHER_AK} from '../config'
export const reqLogin =  (username,password) => myAxios.post('/login',{username,password});
export const reqWeather = () => {
    const url = `${WEATHER_BASE_URL}?location=仙桃&output=json&ak=${WEATHER_AK}`;
    return new Promise(
        (resole,reject) => {
            jsonp(url,(err,data) => {
                if(!err){
                    const dayPictureUrl = data.results[0].weather_data[0].dayPictureUrl;
                    const weather = data.results[0].weather_data[0].weather;
                    const weatherObj ={dayPictureUrl,weather};
                    resole(weatherObj)
                }else{
                    message.error('请求数据失败,请联系管理员')
                }
            })
        }
    )
    
}

