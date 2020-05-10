import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { router } from 'umi';

import {
  Button,
  Card,
  List,
  Modal,
  message
} from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import styles from './style.less';

class UseIn extends Component {
  state = {
    page: 1,
    pageSize: 5,
    status: 1,
  };

  formLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 13,
    },
  };

  addBtn = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    const { page, pageSize, status } = this.state;
    const payload = {
      page,
      pageSize,
      status
    }
    dispatch({
      type: 'useRecords/fetch',
      payload
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.props;
    const { page, pageSize, status } = this.state;
    const { page: prevPage, pageSize: prevPageSize, status: prevStatus } = prevState;
    if (page !== prevPage || pageSize !== prevPageSize || status !== prevStatus) {
      const payload = {
        page,
        pageSize,
        status
      }
      dispatch({
        type: 'useRecords/fetch',
        payload
      });
    }
  }

  getProfile = id => {
    router.replace(`/useRecords/${id}`);
  }

  InItem = currentItem => {
    const { dispatch } = this.props;
    const { tool , staff ,time, productLine , location } = currentItem;
    dispatch({
      type: 'useRecords/useIn',
      payload: {
        staffId : staff.id,
        productLineId : productLine.no,
        locationId: location.id,
        toolId : tool.id,
        time,
        status : 0
      },
    }).then(res => {
      if (res && res.status === "success") {
        message.success("入库成功");
        router.replace(`/useRecords/${res.data.useRecord.id}`)
      }
    });;
  };

  render() {
    const { loading } = this.props;

    const { list, total } = this.props.useRecords;

    const { page, pageSize } = this.state;

    const InOperation = currentItem => {
      Modal.confirm({
        title: '入库',
        content: '确定将该工夹具入库吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => this.InItem(currentItem),
      });
    };

    const pageChange = page => {
      this.setState({
        page
      })
    }

    const paginationProps = {
      showQuickJumper: true,
      pageSize,
      total,
      current: page,
      onChange: pageChange,
    };

    const ListContent = ({ data: { recorder , staff ,time, status , productLine , location} }) => (
        <div className={styles.listContent}>
          <div className={styles.listContentItem}>
            <span>借用人</span>
            <p>{recorder.name}</p>
          </div>
          <div className={styles.listContentItem}>
            <span>操作员</span>
            <p>{staff.name}</p>
          </div>
          <div className={styles.listContentItem}>
            <span>夹具存储点</span>
            <p>{location.name}</p>
          </div>
          <div className={styles.listContentItem}>
            <span>产线</span>
            <p>{productLine.name}</p>
          </div>
          <div className={styles.listContentItem}>
            <span>操作时间</span>
            <p>{moment(time).format('YYYY-MM-DD HH:mm:ss')}</p>
          </div>
           <div className={styles.listContentItem}>
             <span>状态</span>
             <p style={{ width: '120px' }}>{status.name}</p>
           </div>
        </div >
      );

    return (
      <>
        <PageHeaderWrapper>
          <div className={styles.standardList}>
            <Card
              className={styles.listCard}
              bordered={false}
              title="已出库工夹具"
              style={{
                marginTop: 24,
              }}
              bodyStyle={{
                padding: '0 32px 40px 32px',
              }}
            >
              <List
                size="large"
                rowKey="id"
                loading={loading}
                pagination={paginationProps}
                dataSource={list}
                renderItem={item => (
                  <List.Item
                    actions={[  
                      <Button type="primary" onClick={() => InOperation(item)}>入库</Button>
                    ]}
                  >
                    <List.Item.Meta
                      title={<a onClick={() => this.getProfile(item.id)}>{item.tool.tDef.code}</a>}
                      description={item.tool.tDef.name}
                    />
                    <ListContent data={item} />
                  </List.Item>
                )}
              />
            </Card>

          </div>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default connect(({ useRecords, loading }) => ({
  useRecords,
  loading: loading.models.useRecords,
}))(Form.create()(UseIn));
