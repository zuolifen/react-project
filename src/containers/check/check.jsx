import React,{ Component } from "react";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

//check组件是一个高阶组件:1.接收一个组件。2.返回一个新组件
//check组件能够对传入的组件，进行权限检查：
//例如：未登录，不能看admin; 登录了，不能看login
export default function (ReceiveComponent) {
    @connect(
        (state) => ({isLogin:state.userInfo.isLogin}), //这里写的有问题，你已经拿到了isLogin，命名还为userInfo，不合理，这里命名要规范
        {}
    )
    class NewComponent extends Component{
        render(){
            const {isLogin} = this.props; //刚才这里获取的有问题，要考虑映射状态的时候，映射的是什么
            const {pathname} = this.props.location
            //下面第二个判断刚才写错了,第二个判断不要取反，想想那个逻辑，什么情况能看哪个
            if(!isLogin && pathname === '/admin')return <Redirect to="/login"/>
            if(isLogin && pathname === '/login')return <Redirect to="/admin"/>
            return <ReceiveComponent {...this.props}/>
        }
    }
    return NewComponent
}