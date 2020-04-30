import { InfoCircleOutlined } from '@ant-design/icons';
// import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Form, Button, Card, DatePicker, Input, InputNumber, message, Select, Tooltip, Upload, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { router } from 'umi';
import moment from 'moment';
import { getToken } from '../../../utils/authority';

const FormItem = Form.Item;

const { TextArea } = Input;

class RepairAppend extends Component {

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
      formData.append('subTime', new moment(new Date()).format('YYYY-MM-DD h:mm:ss'));

      for (let item in values) {
        if (item !== 'image' && values[item]) {
          formData.append(item, values[item]);
        }
      }


      fetch('/api/repairApps', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: "Bearer " + getToken(),
        }
      }).then(res => res.json()).then((res) => {
        if (res && res.status === 'success') {
          message.success('添加成功');
          router.replace(`/repairs/${res.data.repairApp.id}`);
        } else {
          message.success(res.description);
        }
      })

      // if (!err) {
      //   dispatch({
      //     type: 'repairs/appendRepair',
      //     payload: formData,
      //   }).then(res => {
      //     if (res && res.status === "success") {
      //       message.success("添加成功");
      //       router.replace('/repairs/list')
      //     }
      //   });
      // }
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
      form: { getFieldDecorator },
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
      <PageHeaderWrapper content={<FormattedMessage id="repairAppend.basic.description" />}>
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
              })(
                <Input
                  placeholder='例如：EF2189'
                />,
              )}
            </FormItem>


            <FormItem {...formItemLayout} label='损坏图片上传'>
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
              label="描述"
            >
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: "请输入报修描述"
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
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                保存
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
    submitting: loading.effects['repairs/appendRepair'],
  }))(RepairAppend),
);
