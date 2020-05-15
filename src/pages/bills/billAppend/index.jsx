import { InfoCircleOutlined } from '@ant-design/icons';
// import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Form, Button, Card, Input, InputNumber, message, Upload, Icon, Tabs, Select } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
// import styles from './style.less';
import { router } from 'umi';

import StepBillAppend from './stepBillAppend';
import { queryFamilies } from '@/services/family';

const FormItem = Form.Item;
const { TextArea } = Input;
const { TabPane } = Tabs;

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



class BillAppend extends Component {

    state = {
        fileData: [],
        families: [],
        loadingFamilies: false
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
                }).then(res => {
                    if (res && res.status === "success") {
                        message.success("添加成功");
                        router.replace(`/bills/${res.data.billReq.id}`)
                    }
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


    onSelectLoading = () => {
        this.setState({
            loadingFamilies: true
        }, () => {
            this.loadFamilies();
        })
    }

    // 加载family列表
    loadFamilies = () => {
        queryFamilies().then((res) => {
            this.setState({
                families: res.data.families,
                loadingFamilies: false,
            })
        })
    }


    render() {
        const {
            form: { getFieldDecorator, getFieldValue },
        } = this.props;
        const { submitting } = this.props;
        const { loadingFamilies, families } = this.state;

        return (
            <PageHeaderWrapper content={<FormattedMessage id="billsandbillappend.basic.description" />}>
                <Card bordered={false}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="单条申请" key="1">
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
                                    label="采购数量"
                                >
                                    {getFieldDecorator('count')(
                                        <InputNumber
                                            min={1}
                                            step={5}
                                        />,
                                    )}
                                </FormItem>

                                <Form.Item
                                    {...formItemLayout}
                                    label="所属大类"
                                    hasFeedback
                                >
                                    {getFieldDecorator('family', {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入夹具所属大类"
                                            },
                                        ],
                                    })(
                                        <Select
                                            placeholder="例如：JABIL FU"
                                            onFocus={this.onSelectLoading}
                                            loading={loadingFamilies}>
                                            {families.length ?
                                                families.map((family, index) => (<Option key={index} value={family.name}>{family.name}</Option>))
                                                :
                                                null
                                            }
                                        </Select>
                                    )}
                                </Form.Item>


                                <FormItem
                                    {...formItemLayout}
                                    label="所属大类"
                                >

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
                                            uploadList
                                            listType="picture-card"
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
                                    label="描述信息"
                                >
                                    {getFieldDecorator('remark', {
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入采购相关描述信息"
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
                        </TabPane>
                        <TabPane tab="批量申请" key="2">
                            <StepBillAppend></StepBillAppend>
                        </TabPane>
                    </Tabs>
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
