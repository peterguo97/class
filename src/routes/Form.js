import React from 'react'
import moment from 'moment';

import {
    Form, DatePicker, Button, Select, Input, notification,
  } from 'antd';

const { TextArea } = Input;

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

function getDate() {
    var date = new Date();

    // 获取当前月份
    var nowMonth = date.getMonth() + 1;

    // 获取当前是几号
    var strDate = date.getDate();

    // 添加分隔符“-”
    var seperator = "-";

    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = "0" + nowMonth;
    }

    // 对月份进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
    }

    // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
    var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;

    return nowDate;
}

class ClassForm extends React.Component {
    constructor(props) {
        super(props)
        const data = props.location.query;
        this.state = {
            date: null,
        }
        if (data) {
            console.log(data.date)
            this.state = {
                class: data.class,
                build: data.build,
                time: data.time,
                date: data.date,
            }
        } else {
            this.state.date = getDate();
        }
    }
    handleChange = (value) => {
        console.log(value);
    }
    handleSubmit = (e) => {
      e.preventDefault();
  
      this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
  
        // Should format date value before submit.
        const values = {
          ...fieldsValue,
          'date-picker': fieldsValue['date'].format('YYYY-MM-DD'),
        };
        notification['success']({
            message: "消息通知",
            description: "您的教室申请请求已发往后台审核,经后台人员审核后即可使用该教室",
        })
        console.log('Received values of form: ', values);
      });
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const config = {
        rules: [{ required: true, message: 'Please select time!' }],
        initialValue: moment(this.state.date, 'YYYY-MM-DD'),
      };
     
      return (
        <Form onSubmit={this.handleSubmit}>
            <Form.Item
                {...formItemLayout}
                label="日期"
            >
                {getFieldDecorator('date-picker', config)(
                <DatePicker />
                )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="楼号"
            >
                {getFieldDecorator('build', {
                    rules: [
                    { required: true, message: '请选择楼号!' },
                    ],
                    initialValue: this.state.build,
                })(
                    <Select style={{ width: 120, marginRight: 10 }} onChange={this.handleChange}>
                    { 
                        buildlist.map((item) => {
                            return(
                                <Option key={item.id} value={item.name}>{item.name}</Option>
                            )
                        })
                    }
                    </Select>
                )}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="教室号"
            >
                {getFieldDecorator('class', {
                    rules: [{ required: true, message: '请选择你要占用的教室!' }],
                    initialValue: this.state.class,
                })(
                    <Input style={{width: "180px"}} size="default" />
                )}
            </Form.Item>
            <Form.Item
                label="占用时间"
                {...formItemLayout}
                >
                {getFieldDecorator('time', {
                    rules: [{ required: true, message: '请选择占用时间!' }],
                    initialValue: this.state.time,
                })(
                    <Select
                    placeholder="请选择占用时间"
                    style={{width: "180px"}}
                    // onChange={this.handleSelectChange}
                    >
                       {
                            timelist.map((item) => {
                                return (
                                    <Option key={item.id} value={item.name}>{item.name}</Option>
                                )
                            })
                        }
                    </Select>
                )}
            </Form.Item>
            <Form.Item
                label="借用理由"
                {...formItemLayout}
            >
            {
                getFieldDecorator('reason', {
                    rules: [{ required: true, message: "请简述申请教室的理由！ "}]
                })(
                    <TextArea style={{width: "500px"}} rows={6} />
                )
            }

            </Form.Item>
            <Form.Item
                wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 },
                }}
            >
            <Button type="primary" htmlType="submit">提交申请</Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedTimeRelatedForm = Form.create({ name: 'time_related_controls' })(ClassForm);

  export default WrappedTimeRelatedForm;


  