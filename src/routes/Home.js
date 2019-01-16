import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Select, DatePicker, Button, Table, message } from 'antd';  

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    }
  }

  componentDidMount = () => {
    axios.get("/api/homepage").then((mes)=>{
      console.log(mes.data)
      this.setState({
        data: mes.data,
      })
      console.log(this.state.data)
    })
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
                    pathname: '/app/form',
                    query: record
                }
                return (
                    <span>{ text ? <Link to={path}><Button type="primary">空闲</Button></Link>: <Button type="danger">忙碌</Button> }</span>
                )
            },
        },
    ]
    return (
      <div>
        <h3 style={{ marginTop: 2, marginBottom: 16 }}>当前可用</h3>
        <Table columns={cols} dataSource={this.state.data} />
      </div>
    );
  }
}

export default Home;