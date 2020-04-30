import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Select, Table, Divider, Button } from 'antd';
import request from '../../services/request';
import { router } from 'umi';

const { Search } = Input;
const TDefs = () => {
  const [params, setParams] = useState({
    page: 1,
    pageSize: 5,
    param: 'code',
    content: '',
  });

  const [data, setData] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const result = await request('/api/tDefs', {
        params,
      }
      );
      setData(result.data.tDefs);
    };
    fetch();
  }, [params]);





  const getProfile = (id) => {
    router.replace(`/tdefs/${id}`);
  }


  const paramChange = (param, content) => {
    const copy = JSON.parse(JSON.stringify(params));
    copy[param] = content;
    setParams(copy);
  }

  const columns = [
    {
      title: '编号',
      dataIndex: 'code',
      align: 'center',
    },
    {
      title: '名称',
      className: 'column-money',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '用途',
      dataIndex: 'usedFor',
      align: 'center',
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

  const selectParam = (
    <Select defaultValue="code" onChange={(value) => paramChange('param', value)}>
      <Option value="code">编号</Option>
      <Option value="name">名称</Option>
      <Option value="usedFor">用途</Option>
    </Select >
  );

  return (
    <div>
      <Row justify="space-between">
        <Col span={10}>
          <Search
            addonBefore={selectParam}
            placeholder="输入查询字段"
            enterButton="Search"
            size="large"
            onSearch={value => paramChange('content', value)}
          />
        </Col>
      </Row>
      <Divider></Divider>
      <Row>
        <Table
          columns={columns}
          dataSource={data.list}
          pagination={{ pageSize: params.pageSize, total: data.total, onChange: (page) => paramChange('page', page) }}
          bordered
          title={() => '夹具定义列表'}
        />
      </Row>
    </div>
  )
}


export default TDefs;