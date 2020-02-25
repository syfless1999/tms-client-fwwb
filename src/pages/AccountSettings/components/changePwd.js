import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment } from 'react';
import { Modal , Form , Input , message} from 'antd';
import { connect } from 'dva';

class ChangePwd extends Component {
   
  handleSubmitPwd = e => {
    e.preventDefault();
    const {form,onCancel} = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        onCancel();
      //   const {dispatch} = this.props;
      //   dispatch({
      //     type: "/users/changePwd",
      //     payload: values,
      //     callback:response=>{
      //       if(response.type === "success"){
      //         this.setState({
      //           visible: false,
      //         });
      //       }else{
      //         message.error(response.content);
      //       }
      //     }
      //   })
       }
    });
  };

  CheckPwd =(rule,value,callback)=>{
    const {form} = this.props;
    const pwd = form.getFieldValue("newpwd");
    if(value){
        if(value !== pwd){
          callback("两次输入的密码不一致！");
        }else{
          callback();
        } 
    }else{
        callback();
    } 
  }

  CheckSamePwd =(rule,value,callback)=>{
    const {form} = this.props;
    const pwd = form.getFieldValue("oldpwd");
    if(value && value === pwd){
        callback("原密码与新密码相同！");
    }else{
        callback();
    } 
  }

  render() {

    const { form:{getFieldDecorator} , visible , onCancel} = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
        <Modal
          title="修改密码"
          visible = { visible }
          destroyOnClose
          maskClosable={false}
          onOk={this.handleSubmitPwd}
          onCancel={onCancel}
        >
          <Form
           {...formItemLayout}
          >
            <Form.Item label="oldpwd" hasFeedback>
              {getFieldDecorator('oldpwd', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your oldpwd!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="newpwd" hasFeedback>
              {getFieldDecorator('newpwd', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your newpwd!',
                  },
                  {
                    validator: this.CheckSamePwd,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>

            <Form.Item label="confirmpwd" hasFeedback>
              {getFieldDecorator('confirmpwd', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your confirmpwd!',
                  },
                  {
                    validator: this.CheckPwd,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>

          </Form>
        </Modal>
    );
  }
}

export default Form.create()(ChangePwd);