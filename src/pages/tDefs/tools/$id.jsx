import React, { useState, useEffect } from 'react'
import { Card, Descriptions, Divider, Typography, Empty, Tabs, Row, Col } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from '@/services/request';

import LifeCycles from './lifeCycles';
import Failure from './failure';
import Location from './location';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;



// 生命周期tab
const LifeCycleTab = ({ data }) => {
  return (
    <>
      <Title level={4}>夹具的生命周期</Title>
      <br />
      <br />
      <br />
      {
        data.length ?
          <LifeCycles data={data}></LifeCycles>
          :
          <Empty></Empty>
      }
    </>
  );
}

// 故障概率tab
const FailureTab = ({ data }) => {
  const otherReasons = [
    "夹具是否有部件损坏.",
    "夹具有钢套损坏掉落等不良.",
    "夹具有机械部件松动.",
    "夹具电路不正常工作.",
    "夹具有不正常的响声.",
    "夹具不牢固的固定在对应位置.",
    "使用抹布或者刷子进行夹具清洁."
  ]

  const reasons = otherReasons.map(item => (
    <li>{item}</li>
  ));

  return (
    <>
      <Title level={4}>夹具的故障概率</Title>
      <Row>
        <Col span={12}>
          <Failure data={data}></Failure>
        </Col>
        <Col span={12}>
          <Title level={4}>可能发生故障最大的原因</Title>
          <Paragraph>
            <Text mark>夹具螺丝松动.</Text>
          </Paragraph>
          <Title level={4}>其他可能原因</Title>
          <Paragraph>
            <ul>
              {reasons}
            </ul>
          </Paragraph>
        </Col>
      </Row>
    </>
  )
}


const styleLocation = {
    width:1020,
    height:680
}


// 位置tab
const LocationTab = ({ data }) => {
  return (
    <>
      <Title level={4}>夹具的位置</Title>
      <Location data={data} {...styleLocation}></Location>
    </>
  )
}




const $id = props => {
  const { id } = props.match.params;

  const [tool, setTool] = useState({});
  const [lifeCycles, setLifeCycles] = useState([]);
  const [failure, setFailure] = useState(0);
  const [locationInfo, setLocationInfo] = useState({});

  // 拉取当前夹具实体
  useEffect(() => {
    const fetch = async () => {
      const result = await request(`/api/tools?toolId=${id}`);
      setTool(result.data.tool);
    }
    fetch();
  }, []);

  // 拉取当前夹具的生命周期
  useEffect(() => {
    const fetch = async () => {
      const result = await request(`/api/lifeCycles?toolId=${id}`);
      if (result.data && result.data.hasOwnProperty('lifeCycles')) {
        setLifeCycles(result.data.lifeCycles);
      }
    }
    fetch();
  }, []);

  // 拉取夹具故障概率
  useEffect(() => {
    const fetch = async () => {
      const result = await request(`/api/failure?toolId=${id}`);
      if (result.data && result.data.hasOwnProperty('probability')) {
        setFailure(+result.data.probability);
      }
    }
    fetch();
  }, []);

  // 拉取位置
  useEffect(() => {
    const fetch = async (id) => {
      
      const result = await request(`/api/tools/currentLocation/${id}`);
      if (result.data && result.data.hasOwnProperty('locations')) {
        setLocationInfo(result.data);
      }
    };
    fetch(id);
  }, []);

  return (
    <PageHeaderWrapper>
      <Card>
        <Descriptions
          title="夹具实体信息"
          style={{
            marginBottom: 32,
          }}
        >
          <Descriptions.Item label="夹具代码">{tool.code}</Descriptions.Item>
          <Descriptions.Item label="序列号">{tool.seqId}</Descriptions.Item>
          <Descriptions.Item label="采购单据号">{tool.billNo}</Descriptions.Item>
          <Descriptions.Item label="入库日期">{tool.regDate}</Descriptions.Item>
          <Descriptions.Item label="已使用次数">{tool.usedCount}</Descriptions.Item>
          {tool.location ?
            <Descriptions.Item label="存放库位">{tool.location.name}</Descriptions.Item>
            : null}
        </Descriptions>
        <Divider
          style={{
            marginBottom: 32,
          }}
        />
        <Tabs defaultActiveKey="1">
          <TabPane
            tab="生命周期"
            key="1">
            <LifeCycleTab data={lifeCycles}></LifeCycleTab>
          </TabPane>
          <TabPane
            tab="故障概率"
            key="2">
            <FailureTab data={failure}></FailureTab>
          </TabPane>
          <TabPane
            tab="实时位置"
            key="3">
            <LocationTab data={locationInfo}></LocationTab>
          </TabPane>
        </Tabs>
      </Card>
    </PageHeaderWrapper>
  )
}

export default $id
