import React from 'react';
import { Table, Icon, Button } from 'antd';

const cols = [
    { title: '教学楼', dataIndex: 'build', key: 'build' },
    { title: '教室', dataIndex: 'class', key: 'class' },
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '状态', 
        dataIndex: 'status',
        key: 'status',
        render: (text,record) => {
            const path = {
                pathname: '/form',
                query: record
            }
            const t1 = <div><Icon type="check" /><span  style={{color: 'green', paddingLeft: '5px' }}>审核通过</span></div>;
            const t2 = <div><Icon type="clock-circle" /><span  style={{color: 'red', paddingLeft: '5px' }}>审核中</span></div>;
            return (
                <span>{ text ? t1 : t2 }</span>
            )
        },
    },
]

const data = [
    { key: '1', build: "教十楼", class: "A101", time: "第一节", status: 1 },
    { key: '2', build: "教十一楼", class: "A102", time: "第一节", status: 0 },
    { key: '3', build: "教十二楼", class: "A104", time: "第一节", status: 0 },
    { key: '4', build: "教七楼", class: "A107", time: "第二节", status: 1 },
  ];

class ApplyTable extends React.Component {
    render() {
        return (
            <div>
                <h3 style={{ marginTop: 2, marginBottom: 16 }}>我的申请</h3>
                <Table columns={cols} dataSource={data} />
            </div>
        )
    }
}

export default ApplyTable;