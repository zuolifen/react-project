import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './css/login.less';
import logo from './img/logo.png'

class Login extends Component {
    passwordValidator = (rule,value,callback) => {
        console.log(rule,value,callback);
        if(!value){
            callback('密码必须输入')
        }else if(value.length < 4){
            callback('密码必须大于4位数')
        }else if(value.length>12){
            callback('密码必须小于12位数')
        }else if(!(/^\w+$/.test(value))){
            callback('密码必须是英文、数字或下划线组成')
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err){
                console.log(values);
            }
        }
        )
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="login">
                <div className="header">
                    <img src={logo} alt="logo"/>
                    <h1>商品管理系统</h1>
                </div>
                <div className="content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {/* 用户名/密码的的合法性要求
									1). 必须输入
									2). 必须大于等于4位
									3). 必须小于等于12位
									4). 必须是英文、数字或下划线组成
							*/} 
                        {getFieldDecorator('username', {
                            rules: [
                                { required: true, message: '用户名必须要输入' },
                                {max:12 , message:'用户名必须小于等于12位'},
                                {min:4 , message:'用户名必须大于等于4位'},
                                {pattern:/^\w+$/,message:'用户名必须是英文、数字或下划线组成'}
                            ]
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('password', {
                            rules:[
                                {validator:this.passwordValidator}
                            ]
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>)}
                        
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Form.create({ name: 'normal_login' })(Login);