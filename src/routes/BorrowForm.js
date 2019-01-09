import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, notification } from 'antd';
import Axios from 'axios';

const FormItem = Form.Item;

class BorrowForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            values["id"] = this.props.match.params.id;            
            Axios.post('/password', values).then( message => {
              if(message.status == 200) {
                notification['success']({
                  message: '提交成功',
                  description: '您已成功提交账号，密码，我们会尽快通知申请学生',
                });
              }
            }).catch((e)=> {
              notification['error']({
                message: '提交失败',
                description: '服务器内部错误，清稍后重试',
              });
            })
          }
        });
      }
    
      handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      }
    
      render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
    
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
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 8,
            },
          },
        };
    
        return (
          <Form onSubmit={this.handleSubmit}>
            <FormItem
            {...formItemLayout}
            label={(
                <span>
                远程账号&nbsp;
                <Tooltip title="teamviewer账号">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            )}
            >
            {getFieldDecorator('number', {
                rules: [{ required: true, message: '请填写远程账号!', whitespace: true }],
            })(
                <Input />
            )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="远程密码"
            >
              {getFieldDecorator('passwd', {
                rules: [{
                  required: true, message: '请填写远程账号密码!',
                }],
              })(
                <Input />
              )}
            </FormItem>
            
            <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">提交</Button>
            </FormItem>
           </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(BorrowForm);

export default WrappedRegistrationForm;
