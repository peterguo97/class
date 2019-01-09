import React from 'react'
import { Select, DatePicker, Button, Table } from 'antd';
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

const cols = [
    { title: '教学楼', dataIndex: 'build', key: 'build' },
    { title: '教室', dataIndex: 'class', key: 'class' },
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '状态', dataIndex: 'status', key: 'status' },
]

const datas = [
    { key: '1', build: "教十楼", class: "A101", time: "第一节课", status: "空闲" },
    { key: '2', build: "教十一楼", class: "A102", time: "第一节课", status: "忙碌" },
    { key: '3', build: "教十二楼", class: "A104", time: "第一节课", status: "空闲" },
    { key: '4', build: "教七楼", class: "A107", time: "第一节课", status: "空闲" },
  ];

function handleChange(value) {
    console.log(`selected ${value}`);
  }

class SearchClass extends React.Component {
    render() {
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
                    <Select defaultValue="请选择教室" style={{ width: 120, marginRight: 10 }} onChange={handleChange}>
                        {option}
                    </Select>               
                    <DatePicker />
                    <Select defaultValue="请选择占用时间" style={{ width: 160, marginLeft: 10 }} onChange={handleChange}>
                        {time}
                    </Select>
                    <span style={{marginLeft: 10}}>
                        <Button type="primary" shape="circle" icon="search" />
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