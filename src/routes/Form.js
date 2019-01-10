import React from 'react'

import {
    Form, DatePicker, Button, Select, Input
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

class ClassForm extends React.Component {
    constructor(props) {
        super(props)
        const data = props.location.query;
        if (data) {
            this.state = {
                class: data.class,
                build: data.build,
                time: data.time,
            }
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
        const rangeValue = fieldsValue['range-picker'];
        const rangeTimeValue = fieldsValue['range-time-picker'];
        const values = {
          ...fieldsValue,
          'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
          'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
          'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
          'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
          'range-time-picker': [
            rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
            rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
          ],
          'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
        };
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
        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
      };
      const rangeConfig = {
        rules: [{ type: 'array', required: true, message: 'Please select time!' }],
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
                 <Select defaultValue="教八" style={{ width: 120, marginRight: 10 }} onChange={this.handleChange}>
                { 
                    buildlist.map((item) => {
                        return(
                            <Option key={item.id} value={item.name}>{item.name}</Option>
                        )
                    })
                }
                </Select>
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="教室号"
            >
                {getFieldDecorator('note', {
                    rules: [{ required: true, message: '请选择你要占用的教室!' }],
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


  