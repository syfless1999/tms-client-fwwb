import { InfoCircleOutlined } from '@ant-design/icons';
// import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Form, Button, Card, DatePicker, Input, InputNumber, Select, Tooltip, Upload, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

class BillAppend extends Component {

  state = {
    fileData: [],
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;

    // 文件组
    const files = this.state.fileData;

    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      let formData = new FormData();
      formData.append("image", files[0]);

      for (let item in values) {
        if (item !== 'image' && values[item]) {
          formData.append(item, values[item]);
        }
      }

      if (!err) {
        dispatch({
          type: 'bills/appendBill',
          payload: formData,
        });
      }
    });
  };


  // 复制的代码
  //这个是监听文件变化的
  fileChange = (params) => {
    const { file, fileList } = params;
    if (file.status === 'uploading') {
      setTimeout(() => {
        this.setState({
          percent: fileList.percent
        })
      }, 1000)
    }
  }
  // 拦截文件上传
  beforeUploadHandle = (file) => {
    this.setState(({ fileData }) => ({
      fileData: [...fileData, file],
    }))
    return false;
  }
  // 文件列表的删除
  fileRemove = (file) => {
    this.setState(({ fileData }) => {
      const index = fileData.indexOf(file);
      return {
        fileData: fileData.filter((_, i) => i !== index)
      }
    })
  }
  // 完



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
              label="夹具代码"
            >
              {getFieldDecorator('code', {
                rules: [
                  {
                    required: true,
                    message: "请输入夹具代码"
                  },
                ],
              })(
                <Input
                  placeholder='例如：EF2189'
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="夹具名称"
            >
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: "请输入夹具名称"
                  },
                ],
              })(
                <Input
                  placeholder='例如：MOD 3XM2 调谐夹具'
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="所属大类"
            >
              {getFieldDecorator('family', {
                rules: [
                  {
                    required: true,
                    message: "请输入夹具所属大类"
                  },
                ],
              })(
                <Input
                  placeholder='例如：JABIL FU'
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="夹具模组"
            >
              {getFieldDecorator('model', {
                rules: [
                  {
                    required: true,
                    message: "请输入夹具模组"
                  },
                ],
              })(
                <Input
                  placeholder='例如：MOD 3XM2'
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="夹具料号（多个）"
            >
              {getFieldDecorator('partNo', {
                rules: [
                  {
                    required: true,
                    message: "请输入夹具料号"
                  },
                ],
              })(
                <Input
                  placeholder='例如：PNA90320/1 PNA90320/2 PNA90322/1'
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="夹具存储点"
            >
              {getFieldDecorator('location', {
                rules: [
                  {
                    required: true,
                    message: "请输入夹具存储点"
                  },
                ],
              })(
                <Input
                  placeholder='例如：16-A2'
                />,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label='物品图片上传'>
              {getFieldDecorator('image')(
                <Upload action='路径'
                  multiple uploadList
                  beforeUpload={this.beforeUploadHandle}
                  onChange={this.fileChange}
                  onRemove={this.fileRemove}
                  fileList={this.state.fileData}>
                  <Button><Icon type='upload' />上传图片</Button>
                </Upload>
              )}
            </FormItem>


            <FormItem
              {...formItemLayout}
              label="用途"
            >
              {getFieldDecorator('usedFor', {
                rules: [
                  {
                    required: true,
                    message: "请输入用途描述"
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
              label={
                <span>
                  <FormattedMessage id="billsandbillappend.client.label" />
                  <em className={styles.optional}>
                    <FormattedMessage id="billsandbillappend.form.optional" />
                    <Tooltip title={<FormattedMessage id="billsandbillappend.label.tooltip" />}>
                      <InfoCircleOutlined
                        style={{
                          marginRight: 4,
                        }}
                      />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('client')(
                <Input
                  placeholder={formatMessage({
                    id: 'billsandbillappend.client.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  <FormattedMessage id="billsandbillappend.invites.label" />
                  <em className={styles.optional}>
                    <FormattedMessage id="billsandbillappend.form.optional" />
                  </em>
                </span>
              }
            >
              {getFieldDecorator('invites')(
                <Input
                  placeholder={formatMessage({
                    id: 'billsandbillappend.invites.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="采购数量"
            >
              {getFieldDecorator('number')(
                <InputNumber
                  min={0}
                  step={1}
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="该夹具在每条产线上需要配备的数量"
            >
              {getFieldDecorator('upl')(
                <InputNumber
                  min={0}
                  step={1}
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="保养点检周期"
            >
              {getFieldDecorator('pmPeriod')(
                <InputNumber
                  min={0}
                  step={30}
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
    submitting: loading.effects['bills/appendBill'],
  }))(BillAppend),
);
