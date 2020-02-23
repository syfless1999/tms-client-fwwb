import { InfoCircleOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Card, DatePicker, Input, InputNumber, Radio, Select, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

class ChangetDefs extends Component {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'changetDefs/submitRegularForm',
          payload: values,
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
      <PageHeaderWrapper content={<FormattedMessage id="changetdefs.basic.description" />}>
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >

            <FormItem {...formItemLayout} label={<FormattedMessage id="changetdefs.name.label" />}>
              {getFieldDecorator('name', {
                initialValue: 'MOD 3XM2 调谐夹具',
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'changetdefs.name.required',
                    }),
                  },
                ],
            })(<Input/>)}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="changetdefs.partNo.label" />}>
              {getFieldDecorator('partNo', {
                initialValue: 'PNA90320/1 PNA90320/2 PNA90322/1',
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'changetdefs.partNo.required',
                    }),
                  },
                ],
              })(<Input/>)}
            </FormItem>
            
            <FormItem {...formItemLayout} label={<FormattedMessage id="changetdefs.usedFor.label" />}>
              {getFieldDecorator('usedFor', {
                initialValue: '打调谐盖板',
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'changetdefs.usedFor.required',
                    }),
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

            <FormItem {...formItemLayout} label={<FormattedMessage id="changetdefs.UPL.label" />}>
              {getFieldDecorator('UPL', {
                initialValue: '3',
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'changetdefs.UPL.required',
                    }),
                  },
                ],
              })(<Input/>)}
            </FormItem>

            <FormItem
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="changetdefs.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="changetdefs.form.save" />
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
    submitting: loading.effects['changetDefs/submitRegularForm'],
  }))(ChangetDefs),
);
