import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment } from 'react';
import { Modal , Form , Input , message} from 'antd';
import { connect } from 'dva';

class ChangeEmail extends Component {
   
handleSubmitEmail = e => {
    e.preventDefault();
    const {form , onCancel} = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: "user/changeEmail",
          payload: values,
        }).then(res => {
          if (res && res.status === "success") {
            message.success("修改成功");
            onCancel();
          }
        })
      }
    });
  };

  render() {

    const { form:{getFieldDecorator} , visible , onCancel} = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
        <Modal
          title="修改邮箱"
          visible={visible}
          destroyOnClose
          maskClosable={false}
          onOk={this.handleSubmitEmail}
          onCancel={onCancel}
        >
          <Form {...formItemLayout}>
            
            <Form.Item label="email" hasFeedback>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your oldpwd!',
                  },
                  {
                    type: 'email',
                    message: '邮箱格式不正确！'
                  },
                ],
              })(<Input />)}
            </Form.Item>

          </Form>
        </Modal>
    );
  }
}

export default Form.create()(connect(({ loading , user}) => ({
  user,
  loading: loading.effects['user/fetchCurrent']
}))(ChangeEmail));