import LoginReducer from './login';
import {combineReducers} from 'redux';
export default combineReducers(
    {
        userInfo:LoginReducer
    }
)