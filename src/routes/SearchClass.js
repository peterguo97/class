import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Select, DatePicker, Button, Table, message } from 'antd';
import { getDate } from '../util/utils';
const Option = Select.Option;


const buildlist = [
    {id: 1, name: "教八楼" },
    {id: 2, name: "教九楼" },
    {id: 3, name: "教十楼" },
    {id: 4, name: "教十一楼" },
]

const timelist = [
    {id: 1, name: "第一节"},
    {id: 2, name: "第二节"},
    {id: 3, name: "第三节"},
    {id: 4, name: "第四节"},
    {id: 5, name: "第五节"},
]

const datas = [
    { key: '1', build: "教十楼", class: "A101", time: "第一节", status: 1 },
    { key: '2', build: "教十一楼", class: "A102", time: "第一节", status: 0 },
    { key: '3', build: "教十二楼", class: "A104", time: "第一节", status: 0 },
    { key: '4', build: "教七楼", class: "A107", time: "第二节", status: 1 },
  ];

function handleChange(value) {
    console.log(`selected ${value}`);
  }

class SearchClass extends React.Component {
    constructor() {
        super();
        var date = getDate();
        this.state = {
            date: date,
            class: null,
            build: null,
            time: null
        }
    }

    handleTimeChange = (moment, str) => {
        this.setState({
            date: str
        })
    }

    handleBuildChange = (value) => {
        this.setState({
            build: value
        })
    }

    handleClick = () => {
        if(!this.state.build || !this.state.date) {
            message.error("筛选范围过大，请至少选择教学楼以及日期两项！");
            return;
        }
    }

    render() {
        const cols = [
            { title: '教学楼', dataIndex: 'build', key: 'build' },
            { title: '教室', dataIndex: 'class', key: 'class' },
            { title: '时间', dataIndex: 'time', key: 'time' },
            { title: '状态', 
                dataIndex: 'status',
                key: 'status',
                render: (text,record) => {
                    record.date = this.state.date;
                    const path = {
                        pathname: '/form',
                        query: record
                    }
                    return (
                        <span>{ text ? <Link to={path}><Button type="primary">空闲</Button></Link>: <Button type="danger">忙碌</Button> }</span>
                    )
                },
            },
        ]
        const option = buildlist.map((item) => {
            return(
                <Option key={item.id} value={item.name}>{item.name}</Option>
            )
        })
        
        const time = timelist.map((item) => {
            return (
                <Option key={item.id} value={item.name}>{item.name}</Option>
            )
        })
        return(
            <div>
                <div style={{textAlign: "center"}}>
                    <Select defaultValue="请选择教学楼" style={{ width: 140, marginRight: 10 }} onChange={this.handleBuildChange}>
                        {option}
                    </Select>            
                    <DatePicker defaultValue={moment(this.state.date, 'YYYY-MM-DD')} onChange={this.handleTimeChange} />
                    <Select defaultValue="请选择占用时间" style={{ width: 160, marginLeft: 10 }} onChange={this.handleTimeChange}>
                        {time}
                    </Select>
                    <span style={{marginLeft: 10}}>
                        <Button type="primary" onClick={this.handleClick} shape="circle" icon="search" />
                    </span>
                </div>
                <div>
                <h3 style={{ marginTop: 2, marginBottom: 16 }}>查询结果</h3>
                <Table columns={cols} dataSource={datas} />              
                </div>
            </div>

        )
    }
}

export default SearchClass;