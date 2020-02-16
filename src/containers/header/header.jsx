import React, { Component } from 'react'
import './header.less';
import {Button,Icon,Modal} from 'antd';
import screenfull from 'screenfull';
import {connect} from 'react-redux';
import {createDeleteUserInfoAction} from '../../redux/actions/login';
import dayjs from 'dayjs';
import {reqWeather} from '../../api';

const { confirm } = Modal;
@connect(
    (state) => ({userInfo:state.userInfo}),
    {deleteUserInfo:createDeleteUserInfoAction}
)
class Header extends Component {
    state = {
        isFull:false,
        data:dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
        weatherDate:{pic:'',temp:''}
    }
    //点击切换全屏
    fullscreen = () => {
        screenfull.toggle()
    }
    //退出登录
    logout = () => {
        confirm({
            title: '确认要退出登录吗?',
            content: '退出后需要重新登录',
            okText:'确定',
            cancelText:'取消',
            onOk:()=>{
               this.props.deleteUserInfo()
            }
          });
    }
    //获取天气请求
    getWeatherDate =async () => {
        let weatherDate = await reqWeather();
        const temperature = weatherDate.weather;
        const dayPictureUrl =weatherDate.dayPictureUrl;
        this.setState({weatherDate:{pic:dayPictureUrl,temp:temperature}})
    }
    componentDidMount(){
        //检测全屏变化
        screenfull.on('change', () => {
            const isFull = !this.state.isFull;
            this.setState({isFull})
        });
        //设置时间
        this.timeout = setInterval(() => {
            this.setState({data:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')});
        },1000)
        //发送天气请求,调用天气方法
        this.getWeatherDate();
    }
    componentWillUnmount(){
        clearInterval(this.timeout)
    }
    render() {
        return (
            <div className="header">
                <div className="header-top">
                    <Button size="small" onClick={this.fullscreen} >
                        <Icon type={this.state.isFull?"fullscreen-exit":"fullscreen"} />
                    </Button>
                    <span>欢迎：{this.props.userInfo.user.username}</span>
                    <Button type="link" onClick={this.logout}>退出登录</Button>
                </div>
                <div className="header-bottom">
                    <div className="bottom-left">首页</div>
                    <div className="bottom-right">
                        <span>{this.state.data}</span>
                        <img src={this.state.weatherDate.pic} alt="天气图片"/>
                        <span>{this.state.weatherDate.temp}</span>
                    </div>

                </div>
            </div>
        )
    }
}
export default Header;
