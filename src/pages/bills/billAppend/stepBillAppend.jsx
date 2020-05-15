import React from 'react';
import { Steps, Button, message, Form, Upload, Divider, Typography, } from 'antd';
import { DownloadOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons';

import { downloadTemplate, uploadFiles } from '../../../services/billFile';
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
            excel: [],
            images: [],
            loading: false,
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

    //   下载模版excel上传文件
    download = () => {
        downloadTemplate().then(res => res.blob()).then(blob => {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(blob);
            var filename = '批量采购入库申请模版文件.xlsx';
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        });
    }



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

    beforeExcelUploadHandle = (file) => {
        this.setState(({ excel }) => ({
            excel: [...excel, file],
        }))
        return false;
    }
    beforeImagesUploadHandle = (file) => {
        this.setState(({ images }) => ({
            images: [...images, file],
        }))
        return false;
    }

    imagesRemove = (file) => {
        this.setState(({ images }) => {
            const index = images.indexOf(file);
            return {
                images: images.filter((_, i) => i !== index)
            }
        })
    }

    submitBills = () => {
        const { excel, images } = this.state;



        const formData = new FormData();
        formData.append('excel', excel[0]);

        formData.append('images', images);

        this.setState({
            loading: true
        }, () => {
            uploadFiles(formData).then(res => res.json()).then(res => {
                if (res.status === 'success') {
                    message.success('批量申请成功');
                    this.next();
                } else {
                    message.error('批量申请失败，' + res.description || "原因不明");
                }
                this.setState({
                    excel: null,
                    images: [],
                    loading: false
                })
            })
        })


    }



    render() {
        const { current, excel, images, loading } = this.state;

        const excelProps = {
            name: 'file',
            onChange: this.fileChange,
            beforeUpload: this.beforeExcelUploadHandle,
            fileList: excel,
        };

        const imageProps = {
            name: 'images',
            multiple: true,
            onChange: this.fileChange,
            beforeUpload: this.beforeImagesUploadHandle,
            fileList: images,
            onRemove: this.imagesRemove
        }

        const steps = [
            {
                title: '提交基础信息表格',
                content:
                    <div className={styles.firstStep}>
                        <div>
                            下载模版：
                        <Button type="primary" ghost onClick={this.download}>
                                <DownloadOutlined />Download
                            </Button>
                        </div>

                        <div>
                            提交表格：
                            <Upload {...excelProps}>
                                <Button>
                                    <UploadOutlined />提交基础信息表格
                                </Button>
                            </Upload>
                        </div>

                        <Button type="primary" htmlType="submit" onClick={() => this.next()} className={styles.stepBtn}>
                            下一步
                </Button>
                    </div>
            },
            {
                title: '提交照片集',
                content: (
                    <>
                        <div>
                            <Dragger {...imageProps} listType="picture" directory>
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
                            <Button type="primary" onClick={this.submitBills} loading={loading}>提交申请</Button>
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