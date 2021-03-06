import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { router } from 'umi';

import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Progress,
  Radio,
  Row,
  Select,
  Result,
} from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import styles from './style.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

class UseRecords extends Component {
  state = {
    visible: false,
    done: false,
    current: undefined,
    page: 1,
    pageSize: 5,
    status: null,
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
    }
    if (status !== null) payload.status = status;
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
      }
      if (status !== null) payload.status = status;
      dispatch({
        type: 'useRecords/fetch',
        payload
      });
    }
  }

  routerAppend = () => {
    router.replace('/useRecords/useout');
  };

  getProfile = id => {
    router.replace(`/useRecords/${id}`);
  }


  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'useRecords/submit',
      payload: {
        id,
      },
    });
  };

  render() {
    const { loading } = this.props;

    const { list, total } = this.props.useRecords;

    const { page, pageSize } = this.state;

    const { form: { getFieldDecorator } } = this.props;

    const { visible, done, current = {} } = this.state;

    const editAndDelete = currentItem => {
      Modal.confirm({
        title: '????????????',
        content: '???????????????????????????',
        okText: '??????',
        cancelText: '??????',
        onOk: () => this.deleteItem(currentItem.id),
      });
    };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const statusChange = e => {
      if (e.target.value === "0") {
        this.setState({
          status: null,
        })
      } else {
        this.setState({
          status: e.target.value,
        })
      }
    }

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup onChange={statusChange} defaultValue="all">
          <RadioButton value="0">??????</RadioButton>
          <RadioButton value="1">??????</RadioButton>
          <RadioButton value="3">??????</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="?????????" onSearch={() => ({})} />
      </div>
    );

    const pageChange = page => {
      this.setState({
        page: page
      })
    }

    const paginationProps = {
      showQuickJumper: true,
      // pageSize: 5,
      pageSize: pageSize,
      // total: 50,
      total: total,
      current: page,
      onChange: pageChange,
    };

    const ListContent = ({ data: { recorder, staff, time, status, productLine, location } }) => {

      return (
        <div className={styles.listContent}>
          <div className={styles.listContentItem}>
            <span>?????????</span>
            <p>{recorder.name}</p>
          </div>
          <div className={styles.listContentItem}>
            <span>?????????</span>
            <p>{staff.name}</p>
          </div>
          <div className={styles.listContentItem}>
            <span>???????????????</span>
            <p>{location.name}</p>
          </div>
          <div className={styles.listContentItem}>
            <span>??????</span>
            <p>{productLine.name}</p>
          </div>
          <div className={styles.listContentItem}>
            <span>????????????</span>
            <p>{moment(time).format('YYYY-MM-DD HH:mm:ss')}</p>
          </div>
          <div className={styles.listContentItem}>
            <p style={{ width: '120px' }}>{status.name}</p>
          </div>
        </div >
      )
    };

    const MoreBtn = ({ item }) => (
      <Dropdown
        overlay={
          <Menu onClick={() => editAndDelete(item)}>
            <Menu.Item key="delete">??????</Menu.Item>
          </Menu>
        }
      >
        <a>
          ?????? <DownOutlined />
        </a>
      </Dropdown>
    );


    return (
      <>
        <PageHeaderWrapper>
          <div className={styles.standardList}>
            <Card bordered={false}>
              <Row>
                <Col sm={8} xs={24}>
                  <Info title="????????????" value="8?????????" bordered />
                </Col>
                <Col sm={8} xs={24}>
                  <Info title="??????????????????????????????" value="32??????" bordered />
                </Col>
                <Col sm={8} xs={24}>
                  <Info title="?????????????????????" value="24?????????" />
                </Col>
              </Row>
            </Card>

            <Card
              className={styles.listCard}
              bordered={false}
              title="?????????????????????"
              style={{
                marginTop: 24,
              }}
              bodyStyle={{
                padding: '0 32px 40px 32px',
              }}
              extra={extraContent}
            >
              {/* <Button
                type="dashed"
                style={{
                  width: '100%',
                  marginBottom: 8,
                }}
                onClick={this.routerAppend}
                ref={component => {
                  // eslint-disable-next-line  react/no-find-dom-node
                  this.addBtn = findDOMNode(component);
                }}
              >
                <PlusOutlined />
                ??????
              </Button>
               */}
              <List
                size="large"
                rowKey="id"
                loading={loading}
                pagination={paginationProps}
                dataSource={list}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <MoreBtn key="more" item={item} />,
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
}))(Form.create()(UseRecords));
