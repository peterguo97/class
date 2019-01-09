import React from 'react';

import Axios from 'axios';

import { List, Avatar, Button, Pagination } from 'antd';

import { Link } from 'react-router-dom';

import style from './css/common.css';

class BorrowList extends React.Component {
    state = {
      data: []
    }
    handleChange = (page,pageSize) => {
      Axios.post('/goodslist',{
        page: page,
        size: pageSize
      }).then((message)=> {
        this.setState({
          data: message.data,
        })
      })
    }
    componentDidMount = () => {
      Axios.post('/goodslist',{
        page: 1,
        size: 10
      }).then((message)=> {
        this.setState({
          data: message.data
        })
      })
    }
    
    render() {
        return (
            <div>
                <List
                  itemLayout="horizontal"
                  dataSource={this.state.data}
                  renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar src={item.img1} />}
                              title={item.title}
                              description={item.detail}
                            />
                              <Link to={`detailrequest/${item.id}`}>
                                <Button type="primary">查看详情</Button>
                              </Link>
                        </List.Item>
                    )}
                />
                <div className={style.listFooter}>
                  <Pagination defaultCurrent={6} total={500} onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}

export default BorrowList;
