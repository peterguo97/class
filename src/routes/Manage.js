import React from 'react';
import { Layout, Menu, Icon, Table, Modal, Button } from 'antd';
import style from './css/common.css';
import ColumnGroup from 'antd/lib/table/ColumnGroup';

const { Header, Content, Footer } = Layout;

const data = [
    { key: '1', build: "教十楼", class: "A101", time: "第一节", status: 1, user: 'Peter', reason: "班级团活动需要占教室" },
    { key: '2', build: "教十一楼", class: "A102", time: "第一节", status: 0, user: 'Judy', reason: "青协社团部门开会请批准" },
    { key: '3', build: "教十二楼", class: "A104", time: "第一节", status: 0, user: 'Dandy', reason: "音协部门开会，需要教室" },
    { key: '4', build: "教七楼", class: "A107", time: "第二节", status: 1, user: 'PG', reason: "通信某班，需要开班会" },
];

class ManagePage extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            build: null,
            class: null,
            time: null,
            user: null,
            reason: null,
        }
    }

    handleOk = (e) => {
        this.setState({
          visible: false,
        });
    }
    
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleClick = (record) => {
        console.log(record);
        this.setState({
            visible: true,
            build: record.build,
            class: record.class,
            time: record.time,
            user: record.user,
            reason: record.reason,
        })
    }

    render() {
        const cols = [
            { title: '用户', dataIndex: 'user', key: 'user'},
            { title: '教学楼', dataIndex: 'build', key: 'build' },
            { title: '教室', dataIndex: 'class', key: 'class' },
            { title: '时间', dataIndex: 'time', key: 'time' },
            {   title: "详情", 
                dataIndex: 'detail', 
                key: 'detail',
                render: (text, record) => {
                    return(
                        <Button type="primary" onClick={this.handleClick.bind(this, record)}>查看详情</Button>
                    )
                },
            },
        ]

        return(
            <Layout className="layout">
                <h1 style={{height: '50px', lineHeight: '60px', textAlign: "center"}}>教室申请后台管理</h1>
                <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">申请列表</Menu.Item>
                </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <Table columns={cols} dataSource={data} />
                    <Modal
                        title="信息详情"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        okText="同意申请"
                        cancelText="取消"
                        onCancel={this.handleCancel}
                        >
                        
                        <div className={style.wrap}><div className={style.wrapLeft}>教学楼:</div>{this.state.build}</div>
                        <div className={style.wrap}><div className={style.wrapLeft}>教室:</div>{this.state.class}</div>
                        <div className={style.wrap}><div className={style.wrapLeft}>占用时间:</div>{this.state.time}</div>
                        <div className={style.wrap}><div className={style.wrapLeft}>申请理由:</div>{this.state.reason}</div>
                    </Modal>
                </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 通信创新实践
                </Footer>
            </Layout>
        )
    }
}

export default ManagePage;
