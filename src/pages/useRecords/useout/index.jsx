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

class UseOut extends Component {

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'useRecords/useOut',
          payload: {
              ...values,
              time: new moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
              status: 1
          }
        }).then(res => {
          if (res && res.status === "success") {
            message.success("出库成功");
            router.replace(`/useRecords/${res.data.useRecord.id}`)
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
      <PageHeaderWrapper content={<FormattedMessage id="billsandbillappend.basic.description" />}>
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
              label="工夹具ID"
            >
              {getFieldDecorator('toolId', {
                rules: [
                  {
                    required: true,
                    message: "请输入工夹具ID"
                  },
                ],
              })(
                <Input
//                  placeholder='例如：EF2189'
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="夹具存储点ID"
            >
              {getFieldDecorator('locationId', {
                rules: [
                  {
                    required: true,
                    message: "请输入夹具存储点"
                  },
                ],
              })(
                <Input
//                  placeholder='例如：16-A2'
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="员工ID"
            >
              {getFieldDecorator('staffId', {
                rules: [
                  {
                    required: true,
                    message: "请输入员工ID"
                  },
                ],
              })(
                <Input
//                  placeholder='例如：A18'
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="产线ID"
            >
              {getFieldDecorator('productLineId', {
                rules: [
                  {
                    required: true,
                    message: "请输入生产线ID"
                  },
                ],
              })(
                <Input
//                  placeholder='例如：7'
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
                <FormattedMessage id="billsandbillappend.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="billsandbillappend.form.save" />
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
    submitting: loading.effects['useRecords/useOut'],
  }))(UseOut),
);
