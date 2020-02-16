import React, { Component } from 'react';
import check from '../check/check';
import { Layout } from 'antd';
import './admin.less';
import Header from '../header/header';

const {Footer,Sider,Content} = Layout;

@check
class Admin extends Component {
    // logout = () => {
    //     this.props.deleteUserInfo();
    // }
    render() {
        return (
            <Layout className="layout">
                <Sider>Sider</Sider>
                <Layout>
                    <Header/>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default  Admin;
