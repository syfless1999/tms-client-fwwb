import {
  DingdingOutlined,
  DownOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Statistic,
  Descriptions,
  Divider,
  Dropdown,
  Menu,
  Popover,
  Steps,
  Table,
  Tooltip,
  Empty,
  Row,
  Col,
  Popconfirm,
  message,
} from 'antd';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { connect } from 'dva';
import styles from './style.less';
import { compareAuthority } from '../../../utils/authority';


const { Step } = Steps;
const ButtonGroup = Button.Group;

// const checkOperation1 = (click) => (
//   <Popconfirm
//     placement="bottomLeft"
//     title="是否通过初审"
//     onConfirm={() => click("已初审未终审")}
//     onCancel={() => click("已提交初审未通过")}
//     okText="Yes"
//     cancelText="No">
//   </Popconfirm>
// );

// const checkOperation2 = (click) => (
//   <Popconfirm
//     placement="bottomLeft"
//     title="是否通过初审"
//     onConfirm={() => click("已初审未终审")}
//     onCancel={() => click("已提交初审未通过")}
//     okText="Yes"
//     cancelText="No">
//   </Popconfirm>
// );

const getStr = status => {
  let percent = 0;
  switch (status) {
    case "已提交未初审":
      percent = "已提交";
      break;
    case "已提交初审未通过":
      percent = "已初审";
      break;
    case "已初审未终审":
      percent = "已初审";
      break;
    case "已初审终审未通过":
      percent = "已终审";
      break;
    case "已终审":
      percent = "已终审";
      break;
    default:
      break;
  }
  return percent;
}

const judgeDisabled = (compareA, status, targetS) => {
  if(status.includes("未通过")) return true
  if (targetS === 1) {
    return (compareAuthority(compareA) < 0) || getStr(status) === "已初审" || getStr(status) === "已终审";
  }
  if (targetS === 2) {
    return compareAuthority(compareA) < 0 || getStr(status) === "已终审" || getStr(status) === "已提交";
  }
  return true
}

const action = (status, click1, click2) => (
  <RouteContext.Consumer>
    {() => (
        <Fragment>
          审核操作：
          <Popconfirm
            placement="bottomLeft"
            title="是否通过初审"
            onConfirm={() => click1("已初审未终审")}
            onCancel={() => click1("已提交初审未通过")}
            okText="Yes"
            cancelText="No">
            <Button type="primary" disabled={judgeDisabled("supervisor", status.name, 1)}>初审</Button>
          </Popconfirm>

          {/* <Button 
            type="primary" 
            disabled={judgeDisabled("supervisor", status.name, 1)}
            onClick={() => checkOperation1(click1)}
            >
              初审
          </Button> */}

          <Popconfirm
            placement="bottomLeft"
            title="是否通过终审"
            onConfirm={() => click2("已终审")}
            onCancel={() => click2("已初审终审未通过")}
            okText="Yes"
            cancelText="No">
            <Button type="danger" disabled={judgeDisabled("manager", status.name, 2)}>终审</Button>
          </Popconfirm>

          {/* <Button 
            type="primary" 
            disabled={judgeDisabled("supervisor", status.name, 2)}
            onClick={() => checkOperation2(click2)}
            >
              终审
          </Button> */}

        </Fragment>
      )}
  </RouteContext.Consumer >
);

const getStatus = status => {
  let percent = 0;
  switch (status) {
    case "已提交未初审":
      percent = 0;
      break;
    case "已提交初审未通过":
      percent = 1;
      break;
    case "已初审未终审":
      percent = 2;
      break;
    case "已初审终审未通过":
      percent = 3;
      break;
    case "已终审":
      percent = 4;
      break;
    default:
      break;
  }
  return percent;
}

const extra = status => (
  <Row className={styles.moreInfo}>
    <Col span={12}>
      <Statistic title="状态" value={getStr(status)} />
    </Col>
  </Row>
);

const description = (subPersonName, toolCode, subTime, reason) => (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
        <Descriptions.Item label="申请人">{subPersonName || ""}</Descriptions.Item>
        <Descriptions.Item label="夹具代码">{toolCode || ""}</Descriptions.Item>
        <Descriptions.Item label="报废原因">{reason || ""}</Descriptions.Item>
        <Descriptions.Item label="申请时间">{subTime || ""}</Descriptions.Item>
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

const popoverContent = (
  <div
    style={{
      width: 160,
    }}
  >
    吴加号
    <span
      className={styles.textSecondary}
      style={{
        float: 'right',
      }}
    >
      <Badge
        status="default"
        text={
          <span
            style={{
              color: 'rgba(0, 0, 0, 0.45)',
            }}
          >
            未响应
          </span>
        }
      />
    </span>
    <div
      className={styles.textSecondary}
      style={{
        marginTop: 4,
      }}
    >
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = (dot, { status }) => {
  if (status === 'process') {
    return (
      <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
        {dot}
      </Popover>
    );
  }

  return dot;
};

class $id extends Component {
  state = {
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'scraps/fetchInfo',
      payload: { id: this.props.match.params.id }
    });
  }

  onOperationTabChange = key => {
    this.setState({
      operationKey: key,
    });
  };

  onTabChange = tabActiveKey => {
    this.setState({
      tabActiveKey,
    });
  };

  firstConfirm = status => {
    const { dispatch } = this.props;
    const {id} = this.props.match.params;

    dispatch({
      type: 'scraps/firstCheck',
      payload: {
        id,
        status: getStatus(status)
      }
    });
  }

  secondConfirm = status => {
    const { dispatch } = this.props;
    const {id} = this.props.match.params;

    dispatch({
      type: 'scraps/secondCheck',
      payload: {
        id,
        status: getStatus(status)
      }
    });
  }

  render() {
    const { tabActiveKey } = this.state;
    const { scraps} = this.props;
    const {info} = scraps;

    const getStatus = (status = "") => {

      if (status.includes("通过")) {
        return "error";
      }
      return "process";
    }

    const getCurrent = status => {
      let percent = 0;
      switch (status) {
        case "已提交未初审":
          percent = 1;
          break;
        case "已提交初审未通过":
          percent = 1;
          break;
        case "已初审未终审":
          percent = 2;
          break;
        case "已初审终审未通过":
          percent = 2;
          break;
        case "已终审":
          percent = 3;
          break;
        default:
          break;
      }
      return percent;
    }

    return (
      (<PageHeaderWrapper
        title="报废申请详细信息"
        extra={action(info.status, this.firstConfirm, this.secondConfirm)}
        className={styles.pageHeader}
        extraContent={extra(info.status.name)}
        content={description(info.subPerson.name, info.tool.code , info.subTime, info.description)}
        tabActiveKey={tabActiveKey}
        onTabChange={this.onTabChange}
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
                    progressDot={customDot}
                    current={getCurrent(info.status.name)}
                    status={getStatus(info.status.name)}
                  >
                    <Step title="提出申请" description={desc(info.subPerson.name || "", info.subTime || "")} />
                    <Step title="初审" description={desc(info.firstPerson.name || "", info.firstTime || "")} />
                    <Step title="终审" description={desc(info.secondPerson.name || "", info.secondTime || "")} />
                    <Step title="完成" />
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
                <Descriptions.Item label="夹具代码">{info.tool.tDef.code || ""}</Descriptions.Item>
                <Descriptions.Item label="名称">{info.tool.tDef.name || ""}</Descriptions.Item>
                <Descriptions.Item label="所属大类">{info.tool.tDef.family || ""}</Descriptions.Item>
                <Descriptions.Item label="点检周期">{info.tool.tDef.pmPeriod || ""}</Descriptions.Item>
                <Descriptions.Item label="用途">{info.tool.tDef.usedFor || ""}</Descriptions.Item>
                <Descriptions.Item label="每条生产线配备的数量">{info.tool.tDef.upl || ""}</Descriptions.Item>
                <Descriptions.Item label="partNo">{info.tool.tDef.partNo || ""}</Descriptions.Item>
              </Descriptions>
              <Descriptions
                style={{
                  marginBottom: 24,
                }}
                title="夹具预览图"
              >
                <Descriptions.Item>
                  <img src={info.image} alt="" />
                </Descriptions.Item>
              </Descriptions>             
            </Card>

            <Card
              title="申请人信息"
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
                <Descriptions.Item label="姓名">{info.subPerson.name || ""}</Descriptions.Item>
                <Descriptions.Item label="编号">{info.subPerson.no || ""}</Descriptions.Item>
                <Descriptions.Item label="ID">{info.subPerson.id || ""}</Descriptions.Item>
                <Descriptions.Item label="职位">{info.subPerson.position.name || ""}</Descriptions.Item>
                <Descriptions.Item label="部门">{info.subPerson.workcell.name || ""}</Descriptions.Item>
                <Descriptions.Item label="电子邮件">{info.subPerson.email || ""}</Descriptions.Item>
                <Descriptions.Item label="申请时间">{info.subTime || ""}</Descriptions.Item>
              </Descriptions>
            </Card>

            <Card
              title="初审人信息"
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
                <Descriptions.Item label="姓名">{info.firstPerson.name || ""}</Descriptions.Item>
                <Descriptions.Item label="编号">{info.firstPerson.no || ""}</Descriptions.Item>
                <Descriptions.Item label="ID">{info.firstPerson.id || ""}</Descriptions.Item>
                <Descriptions.Item label="职位">{info.firstPerson.position.name || ""}</Descriptions.Item>
                <Descriptions.Item label="部门">{info.firstPerson.workcell.name || ""}</Descriptions.Item>
                <Descriptions.Item label="电子邮件">{info.firstPerson.email || ""}</Descriptions.Item>
                <Descriptions.Item label="初审时间">{info.firstTime || ""}</Descriptions.Item>
              </Descriptions>
            </Card>

            <Card
              title="终审人信息"
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
                <Descriptions.Item label="姓名">{info.secondPerson.name || ""}</Descriptions.Item>
                <Descriptions.Item label="编号">{info.secondPerson.no || ""}</Descriptions.Item>
                <Descriptions.Item label="ID">{info.secondPerson.id || ""}</Descriptions.Item>
                <Descriptions.Item label="职位">{info.secondPerson.position.name || ""}</Descriptions.Item>
                <Descriptions.Item label="部门">{info.secondPerson.workcell.name || ""}</Descriptions.Item>
                <Descriptions.Item label="电子邮件">{info.secondPerson.email || ""}</Descriptions.Item>
                <Descriptions.Item label="终审时间">{info.secondTime || ""}</Descriptions.Item>
              </Descriptions>
            </Card>

          </GridContent>
        </div>
      </PageHeaderWrapper>)
    );
  }
}

export default connect(({ scrapsAndId, loading, scraps }) => ({
  scrapsAndId,
  scraps,
  loading: loading.effects['scraps/fetchInfo'],
}))($id);
