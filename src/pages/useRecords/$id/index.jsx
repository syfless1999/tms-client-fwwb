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

// const mobileMenu = (
//   <Menu>
//     <Menu.Item key="1">操作一</Menu.Item>
//     <Menu.Item key="2">操作二</Menu.Item>
//     <Menu.Item key="3">选项一</Menu.Item>
//     <Menu.Item key="4">选项二</Menu.Item>
//     <Menu.Item key="">选项三</Menu.Item>
//   </Menu>
// );


// const action = (status, click1, click2) => (
//   <RouteContext.Consumer>
//     {({ isMobile }) => {
//       {/* if (isMobile) {
//         return (
//           <Dropdown.Button
//             type="primary"
//             icon={<DownOutlined />}
//             //overlay={mobileMenu}
//             placement="bottomRight"
//           >
//             主操作
//           </Dropdown.Button>
//         );
//       } */}

//       return (
//         <Fragment>
//           审核操作：
//           {/* <ButtonGroup>
//             <Button>操作一</Button>
//             <Button>操作二</Button>
//             <Dropdown overlay={menu} placement="bottomRight">
//               <Button>
//                 <EllipsisOutlined />
//               </Button>
//             </Dropdown>
//           </ButtonGroup> */}
//           <Popconfirm
//             placement="bottomLeft"
//             title="是否通过初审"
//             onConfirm={() => click1("已初审未终审")}
//             onCancel={() => click1("已提交初审未通过")}
//             okText="Yes"
//             cancelText="No">
//             <Button type="primary" disabled={judgeDisabled("supervisor", status, 1)}>初审</Button>
//           </Popconfirm>
//           <Popconfirm
//             placement="bottomLeft"
//             title="是否通过终审"
//             onConfirm={() => click2("已终审")}
//             onCancel={() => click2("已初审终审未通过")}
//             okText="Yes"
//             cancelText="No">
//             <Button type="danger" disabled={judgeDisabled("manager", status, 2)}>终审</Button>
//           </Popconfirm>
//         </Fragment>
//       );
//     }}
//   </RouteContext.Consumer >
// );

const judgeDisabled = (compareA, status, targetS) => {

  if (targetS === 1) {
    return (compareAuthority(compareA) < 0) || getStr(status) === "已初审" || getStr(status) === "已终审";
  }
  if (targetS === 2) {
    return compareAuthority(compareA) < 0 || getStr(status) === "已终审";
  }
}


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
const extra = (status, number) => (
  <Row className={styles.moreInfo}>
    <Col span={12}>
      <Statistic title="状态" value={getStr(status)} />
    </Col>
    <Col span={12}>
      <Statistic title="申请数量" value={number} />
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

const operationTabList = [
  {
    key: 'tab1',
    tab: '操作日志一',
  },
  {
    key: 'tab2',
    tab: '操作日志二',
  },
  {
    key: 'tab3',
    tab: '操作日志三',
  },
];
const columns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: text => {
      if (text === 'agree') {
        return <Badge status="success" text="成功" />;
      }

      return <Badge status="error" text="驳回" />;
    },
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
  },
];

class $id extends Component {
  state = {
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'useRecords/fetchInfo',
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

  // firstConfirm = status => {
  //   const { dispatch } = this.props;
  //   const id = this.props.match.params.id;

  //   dispatch({
  //     type: 'bills/firstCheck',
  //     payload: {
  //       id: id,
  //       status: status
  //     }
  //   });
  // }

  // secondConfirm = status => {
  //   const { dispatch } = this.props;
  //   const id = this.props.match.params.id;

  //   dispatch({
  //     type: 'bills/secondCheck',
  //     payload: {
  //       id: id,
  //       status: status
  //     }
  //   });
  // }

  render() {
    const { operationKey, tabActiveKey } = this.state;
    const { useRecordsAndId, loading, useRecords } = this.props;
    const { advancedOperation1, advancedOperation2, advancedOperation3 } = useRecordsAndId;
//    const info = useRecords.info;


    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      ),
    };

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
        title="采购入库申请详细信息"
//        extra={action(info.status, this.firstConfirm, this.secondConfirm)}
        className={styles.pageHeader}
        extraContent={extra(useRecords.status.name, info.number)}
        content={description(info.subPerson.name, info.tDef.name, info.subTime, info.id)}
        tabActiveKey={tabActiveKey}
        onTabChange={this.onTabChange}
      // tabList={[
      //   {
      //     key: 'detail',
      //     tab: '详情',
      //   },
      //   {
      //     key: 'rule',
      //     tab: '规则',
      //   },
      // ]}
      >
        <div className={styles.main}>
          <GridContent>
            {/* <Card
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
                    current={getCurrent(info.status)}
                    status={getStatus(info.status)}
                  >
                    <Step title="提出申请" description={desc(info.subPerson.name || "", info.subTime || "")} />
                    <Step title="初审" description={desc(info.firstPerson.name || "", info.firstTime || "")} />
                    <Step title="终审" description={desc(info.secondPerson.name || "", info.secondTime || "")} />
                    <Step title="完成" />
                  </Steps>
                )}
              </RouteContext.Consumer>
            </Card> */}
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
                <Descriptions.Item label="夹具代码">{info.tDef.code}</Descriptions.Item>
                <Descriptions.Item label="名称">{info.tDef.name}</Descriptions.Item>
                <Descriptions.Item label="所属大类">{info.tDef.family}</Descriptions.Item>
                <Descriptions.Item label="点检周期">{info.tDef.pmPeriod}</Descriptions.Item>
                <Descriptions.Item label="用途">{info.tDef.usedFor}</Descriptions.Item>
                <Descriptions.Item label="每条生产线配备的数量">{info.tDef.upl}</Descriptions.Item>
                <Descriptions.Item label="partNo">{info.tDef.partNo}</Descriptions.Item>
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
              <h4
                style={{
                  marginBottom: 16,
                }}
              >
                信息组
              </h4>
              <Card type="inner" title="多层级信息组">
                <Descriptions
                  style={{
                    marginBottom: 16,
                  }}
                  title="组名称"
                >
                  <Descriptions.Item label="负责人">林东东</Descriptions.Item>
                  <Descriptions.Item label="角色码">1234567</Descriptions.Item>
                  <Descriptions.Item label="所属部门">XX公司 - YY部</Descriptions.Item>
                  <Descriptions.Item label="过期时间">2017-08-08</Descriptions.Item>
                  <Descriptions.Item label="描述">
                    这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...
                  </Descriptions.Item>
                </Descriptions>
                <Divider
                  style={{
                    margin: '16px 0',
                  }}
                />
                <Descriptions
                  style={{
                    marginBottom: 16,
                  }}
                  title="组名称"
                  column={1}
                >
                  <Descriptions.Item label="学名">
                    Citrullus lanatus (Thunb.) Matsum. et
                    Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
                  </Descriptions.Item>
                </Descriptions>
                <Divider
                  style={{
                    margin: '16px 0',
                  }}
                />
                <Descriptions title="组名称">
                  <Descriptions.Item label="负责人">付小小</Descriptions.Item>
                  <Descriptions.Item label="角色码">1234568</Descriptions.Item>
                </Descriptions>
              </Card>
            </Card>
            <Card
              title="用户近半年来电记录"
              style={{
                marginBottom: 24,
              }}
              bordered={false}
            >
              <Empty />
            </Card>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              onTabChange={this.onOperationTabChange}
            >
              {contentList[operationKey]}
            </Card>
          </GridContent>
        </div>
      </PageHeaderWrapper>)
    );
  }
}

export default connect(({ useRecordsAndId, loading, useRecords }) => ({
  useRecordsAndId,
  useRecords,
  loading: loading.effects['useRecords/fetchInfo'],
}))($id);
