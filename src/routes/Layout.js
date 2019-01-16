import React from 'react';
import {  Layout, Menu, Breadcrumb } from 'antd';
import { Link } from "react-router-dom";

const {
  Header, Footer, Sider, Content,
} = Layout;

function IndexPage(props) {
    return(
        <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
                <Link to="/app/search">空闲教室查询</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/app/home">当前可用教室</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/app/apply">我的申请</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    )
}

export default IndexPage;