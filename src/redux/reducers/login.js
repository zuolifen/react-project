import {SAVE_USERINFO,DELETE_USERINFO} from '../action-types';
const _user = JSON.parse(localStorage.getItem('user'));
const _token = localStorage.getItem('token')
let initState = {
    user:_user || {},
    token:_token || '',
    isLogin:(_user && _token)? true : false
}
export default function (preState=initState,action) {
    const {type,data} = action;
    let newState 
    switch (type) {
        case SAVE_USERINFO: //刚才这里单词写错了
            const {user,token} = data;
            newState = {user,token,isLogin:true};
            return  newState
        case DELETE_USERINFO:
            newState = {user:{},token:'',isLogin:false};
            return newState
        default:
            return preState
    }
}
 