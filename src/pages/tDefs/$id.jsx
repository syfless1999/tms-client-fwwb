import React, { useState, useEffect } from 'react'
import { Button, Card, Descriptions, Divider, Table, Row, Col } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';

import request from '@/services/request';
import { getStatusWord } from '@/utils/utils';

import Avatar from '@/components/Avatar';

const $id = (props) => {
  const id = props.match.params.id;

  const [data, setData] = useState({});

  useEffect(() => {
    const fetch = async (id) => {
      const result = await request(`/api/tDefs/${id}`);
      setData(result.data && result.data.tDef);
    }
    fetch(id);
  }, []);

  // 夹具实体列表
  const [tools, setTools] = useState([]);
  // 夹具实体列表分页
  const [param, setParam] = useState({
    page: 1,
    pageSize: 5,
  })

  // 拉取夹具实体列表
  useEffect(() => {
    const fetch = async (id) => {
      const result = await request(`/api/tDefs/${id}/tools?page=${param.page}&pageSize=${param.pageSize}`);
      setTools(result.data.tools);
    }
    fetch(id);
  }, [param]);


 

  // 跳转夹具实体详情页
  const getProfile = id => {
    router.replace(`/tools/${id}`)
  }

  const columns = [
    {
      title: '夹具代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '序列号',
      dataIndex: 'seqId',
      key: 'seqId',
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      render: (text) => text.name,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => getStatusWord(text)
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => {
            getProfile(record.id);
          }
          }>
            详情
            </Button>
        </span>
      ),
    },
  ];
  const pageChange = (page) => {
    setParam({
      ...param,
      page: page
    })
  }


  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <Descriptions
          title="夹具定义信息"
          style={{
            marginBottom: 32,
          }}
        >
          <Descriptions.Item label="名称">{data.name}</Descriptions.Item>
          <Descriptions.Item label="编号">{data.code}</Descriptions.Item>
          <Descriptions.Item label="所属大类">{data.family}</Descriptions.Item>
          <Descriptions.Item label="用途">{data.usedFor}</Descriptions.Item>
          <Descriptions.Item label=" 夹具模组">{data.model}</Descriptions.Item>
          <Descriptions.Item label=" 夹具料号">{data.partNo}</Descriptions.Item>
          <Descriptions.Item label="该夹具在每条产线上需要配备的数量">{data.upl}</Descriptions.Item>
          <Descriptions.Item label="保养点检周期">{data.pmPeriod}</Descriptions.Item>
        </Descriptions>
        <Divider
          style={{
            marginBottom: 32,
          }}
        />
        <Table
          style={{
            marginBottom: 16,
          }}
          pagination={{ pageSize: param.pageSize, total: tools.total, onChange: (page) => pageChange(page) }}
          dataSource={tools.list}
          columns={columns}
        />
        <Divider
          style={{
            marginBottom: 32,
          }}
        />
        {data.owner && data.editer && data.recer ?
          <Descriptions
            title="相关人员"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="责任人">
              <Avatar status={data.owner.position.name} />
              <Divider type="vertical"></Divider>
              {data.owner.name}
            </Descriptions.Item>
            <Descriptions.Item label="录入人">
              <Avatar status={data.recer.position.name} />
              <Divider type="vertical"></Divider>
              {data.recer.name}
            </Descriptions.Item>
            <Descriptions.Item label="修改人">
              <Avatar status={data.editer.position.name} />
              <Divider type="vertical"></Divider>
              {data.editer.name}
            </Descriptions.Item>
          </Descriptions>
          :
          null}

      </Card>
    </PageHeaderWrapper>
  )
}


export default $id;