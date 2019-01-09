import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Layout className="layout">
                    <Header>
                    <div className="logo" />
                    <Menu
                      theme="dark"
                      mode="horizontal"
                      defaultSelectedKeys={['1']}
                      style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1"><Link to="/">设备申请 </Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/article">发表文章</Link></Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/forumManage">帖子管理</Link>
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
                        {this.props.children}
                    </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </div>
        );
    }
}

export default HomePage;
