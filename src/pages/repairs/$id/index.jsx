import { DingdingOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    Statistic,
    Descriptions,
    Steps,
    Row,
    Col,
    Popconfirm,
} from 'antd';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { connect } from 'dva';
import styles from './style.less';
import { compareAuthority } from '../../../utils/authority';
import { IMAGE_URL_SUFFIX } from '../../../constants';
import moment from 'moment';

const { Step } = Steps;


const action = (status, click) => (
    <RouteContext.Consumer>
        {({ isMobile }) => {
            return (
                <>
                    <Popconfirm
                        placement="bottomLeft"
                        title="是否已经修复完成"
                        onConfirm={() => click(1)}
                        okText="Yes"
                        cancelText="No">
                        <Button type="primary" disabled={judgeDisabled("operator 2", status)}>修复</Button>
                    </Popconfirm>
                    <Popconfirm
                        placement="bottomLeft"
                        title="是否关闭此报修申请"
                        onConfirm={() => click(2)}
                        okText="Yes"
                        cancelText="No">
                        <Button type="danger" disabled={judgeDisabled("operator 2", status)}>关闭</Button>
                    </Popconfirm>
                </>
            );
        }}
    </RouteContext.Consumer >
);



const judgeDisabled = (compareA, status) => {
    return (compareAuthority(compareA) < 0) || status != '已提交未处理';
}


const getStr = status => {
    let percent = 0;
    switch (status) {
        case "已提交未初审":
            percent = "已提交";
            break;
        case "已关闭":
            percent = "已修复";
            break;
        default:
            break;
    }
    return percent;
}
const extra = (status) => (
    <Row className={styles.moreInfo}>
        <Col span={12}>
            <Statistic title="状态" value={getStr(status)} />
        </Col>
    </Row>
);

const description = (subPersonName, tDefName, subTime, id) => (
    <RouteContext.Consumer>
        {({ isMobile }) => (
            <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
                <Descriptions.Item label="申请人">{subPersonName || ""}</Descriptions.Item>
                <Descriptions.Item label="夹具名称">{tDefName || ""}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{subTime || ""}</Descriptions.Item>
                <Descriptions.Item label="申请单号">{id || ""}</Descriptions.Item>
            </Descriptions>
        )}
    </RouteContext.Consumer>
);
const desc = (personName, time) => (
    <div className={classNames(styles.textSecondary, styles.stepDescription)}>
        <Fragment>
            {personName}
            <DingdingOutlined
                style={{
                    marginLeft: 8,
                }}
            />
        </Fragment>
        <div>{time}</div>
    </div>
);


const getCurrent = status => {
    let percent = 0;
    switch (status) {
        case "已提交未处理":
            percent = 1;
            break;
        case "已关闭":
            percent = 2;
            break;
        default:
            break;
    }
    return percent;
}

class $id extends Component {


    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'repairs/fetchInfo',
            payload: { id: this.props.match.params.id }
        });
    }



    repairConfirm = status => {
        const { dispatch } = this.props;
        const id = this.props.match.params.id;

        dispatch({
            type: 'repairs/checkRepair',
            payload: {
                id,
                checkTime: new moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
                status,
            }
        });
    }

    render() {
        const { repairs } = this.props;
        const info = repairs.info;
        if (info.tool.tDef.name) {
            return (
                <PageHeaderWrapper
                    title="报修详细信息"
                    extra={action(info.status.name, this.repairConfirm)}
                    className={styles.pageHeader}
                    extraContent={extra(info.tool.status.name)}
                    content={description(info.subPerson.name, info.tool.tDef.name, info.subTime, info.id)}
                >
                    <div className={styles.main}>
                        <GridContent>
                            <Card
                                title="流程进度"
                                style={{
                                    marginBottom: 24,
                                }}
                            >
                                <RouteContext.Consumer>
                                    {({ isMobile }) => (
                                        <Steps
                                            direction={isMobile ? 'vertical' : 'horizontal'}
                                            current={getCurrent(info.tool.status.name)}
                                        >
                                            <Step title="提出申请" description={desc(info.subPerson.name || "", info.subTime || "")} />
                                            <Step title="已修复" description={desc(info.checkPerson ? info.checkPerson.name : "", info.checkTime || "")} />
                                        </Steps>
                                    )}
                                </RouteContext.Consumer>
                            </Card>
                            <Card
                                title="夹具信息"
                                style={{
                                    marginBottom: 24,
                                }}
                                bordered={false}
                            >
                                <Descriptions
                                    style={{
                                        marginBottom: 24,
                                    }}
                                >
                                    <Descriptions.Item label="夹具代码">{info.tool.tDef.code}</Descriptions.Item>
                                    <Descriptions.Item label="名称">{info.tool.tDef.name}</Descriptions.Item>
                                    <Descriptions.Item label="所属大类">{info.tool.tDef.family}</Descriptions.Item>
                                    <Descriptions.Item label="点检周期">{info.tool.tDef.pmPeriod}</Descriptions.Item>
                                    <Descriptions.Item label="用途">{info.tool.tDef.usedFor}</Descriptions.Item>
                                    <Descriptions.Item label="每条生产线配备的数量">{info.tool.tDef.upl}</Descriptions.Item>
                                    <Descriptions.Item label="partNo">{info.tool.tDef.partNo}</Descriptions.Item>
                                </Descriptions>

                                <Descriptions
                                    style={{
                                        marginBottom: 24,
                                    }}
                                    title="夹具损坏预览"
                                >
                                    <Descriptions.Item>
                                        <img src={IMAGE_URL_SUFFIX + info.image} alt="" width={750} />
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>


                        </GridContent>
                    </div>
                </PageHeaderWrapper>
            );
        } else {
            return <div></div>
        }

    }
}

export default connect(({ loading, repairs }) => ({
    repairs,
    loading: loading.effects['repairs/fetchInfo'],
}))($id);
