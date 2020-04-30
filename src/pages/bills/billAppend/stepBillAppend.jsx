import React from 'react';
import { Steps, Button, message, Form, Upload, Divider, Typography } from 'antd';
import { DownloadOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons';

import styles from './style.less';

const { Step } = Steps;
const { Dragger } = Upload;
const { Title, Paragraph } = Typography;


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;

    const props = {
      name: 'file',
      multiple: true,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    const steps = [
      {
        title: '提交基础信息表格',
        content:
          <Form
            {...layout}
          >
            <Form.Item label="填写模版" name="download">
              <Upload>
                <Button type="primary" ghost>
                  <DownloadOutlined />Download
              </Button>
              </Upload>
            </Form.Item>
            <Form.Item label="上传excel" name="basicInfo">
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <UploadOutlined />提交基础信息表格
              </Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={() => this.next()} className={styles.stepBtn}>
                下一步
                </Button>
            </Form.Item>
          </Form>
        ,
      },
      {
        title: '提交照片集',
        content: (
          <>
            <div>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽图像文件夹至此处</p>
                <p className="ant-upload-hint">
                  依次上传申请入库夹具的样本图
                  图片顺序需和上一步excel中夹具的顺序一致
              </p>
              </Dragger>
            </div>
            <div className={styles.stepBtn}>
              <Button type="primary" onClick={() => this.prev()}>上一步</Button>
              <Divider type="vertical"></Divider>
              <Button type="primary" onClick={() => this.next()}>提交申请</Button>
            </div>
          </>
        ),
      },
      {
        title: '申请完成',
        content: (
          <Typography>
            <Title level={2}>
              夹具采购入库申请已成功提交!
            </Title>
          </Typography>
        ),
      },
    ];

    return (
      <div className={styles.stepsBox}>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className={styles.stepsContent}>
          {steps[current].content}
        </div>
      </div>
    );
  }
}
export default App;