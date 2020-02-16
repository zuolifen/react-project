import {SAVE_USERINFO,DELETE_USERINFO} from '../action-types';
export const createSaveUserInfoAction = (personObj) => {
    //向浏览器中保存信息
    const {user,token} = personObj;
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('token',token);
    return {type:SAVE_USERINFO,data:personObj}
}
export const createDeleteUserInfoAction = () => {
    localStorage.clear();
    return {type:DELETE_USERINFO,date:''}
}

