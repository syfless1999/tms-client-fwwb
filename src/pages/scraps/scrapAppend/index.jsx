import { InfoCircleOutlined } from '@ant-design/icons';
// import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Form, Button, Card, DatePicker, Input, InputNumber, message, Select, Tooltip, Upload, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import styles from './style.less';
import { router } from 'umi';


const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

class ScrapAppend extends Component {

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'scraps/appendScrap',
          payload:{
            ...values,
            subTime: new moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        }
        }).then(res => {
          if (res && res.status === "success") {
            message.success("报废申请成功");
            router.replace(`/scraps/${res.data.scrap.id}`)
          }
        });
      }
    });
  };
 
  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 7,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 12,
        },
        md: {
          span: 10,
        },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 7,
        },
      },
    };
    return (
      <PageHeaderWrapper content={<FormattedMessage id="scrapsandscrapappend.basic.description" />}>
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >
            <FormItem
              {...formItemLayout}
              label="夹具代码"
            >
              {getFieldDecorator('toolId', {
                rules: [
                  {
                    required: true,
                    message: "请输入夹具代码"
                  },
                ],
              })(<Input/>)}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="报废原因"
            >
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: "请输入报废原因"
                  },
                ],
              })(
                <TextArea
                  style={{
                    minHeight: 32,
                  }}
                  rows={4}
                />,
              )}
            </FormItem>
            
            <FormItem
              {...formItemLayout}
              label="夹具使用年份"
            >
              {getFieldDecorator('usedCount', {
                rules: [
                  {
                    required: true,
                    message: "请输入夹具使用年份"
                  },
                ],
              })(
                <InputNumber
                  min={0}
                  step={1}
                />,
              )}
            </FormItem>

            <FormItem
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="scrapsandscrapappend.form.submit" />
              </Button>

              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="scrapsandscrapappend.form.save" />
              </Button>

            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(
  connect(({ loading }) => ({
    submitting: loading.effects['scraps/appendScrap'],
  }))(ScrapAppend),
);
