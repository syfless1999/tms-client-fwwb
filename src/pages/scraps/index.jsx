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

class Scraps extends Component {
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
      pageSize
    }
    if (status !== null) payload.status = status;
    dispatch({
      type: 'scraps/fetch',
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
        pageSize
      }
      if (status !== null) payload.status = status;
      dispatch({
        type: 'scraps/fetch',
        payload
      });
    }
  }

  routerAppend = () => {
    router.replace('/scraps/append');
  };

  getProfile = id => {
    router.replace(`/scraps/${id}`);
  }

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'scraps/submit',
        payload: {
          id,
          ...fieldsValue,
        },
      });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'scraps/submit',
      payload: {
        id,
      },
    });
  };

  render() {
    const {
      loading,
    } = this.props;
    const { list , total } = this.props.scraps;
    const { page, pageSize } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { visible, done, current = {} } = this.state;

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除任务',
          content: '确定删除该任务吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    const modalFooter = done
      ? {
        footer: null,
        onCancel: this.handleDone,
      }
      : {
        okText: '保存',
        onOk: this.handleSubmit,
        onCancel: this.handleCancel,
      };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );


    const statusChange = e => {
      if(e.target.value === "5"){
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
          <RadioButton value="5">全部</RadioButton>
          <RadioButton value="0">未处理</RadioButton>
          <RadioButton value="1">初审未通过</RadioButton>
          <RadioButton value="2">已初审</RadioButton>
          <RadioButton value="3">终审未通过</RadioButton>
          <RadioButton value="4">已终审</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
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

    const getPercent = status => {
      let percent = 0;
      switch (status) {
        case "已提交未初审":
          percent = 33.3;
          break;
        case "已提交初审未通过":
          percent = 33.3;
          break;
        case "已初审未终审":
          percent = 66.7;
          break;
        case "已初审终审未通过":
          percent = 66.7;
          break;
        case "已终审":
          percent = 100;
          break;
        default:
          break;
      }
      return percent;
    }

    const getStatus = status =>{
      let percent = "";
      switch (status) {
        case "已提交未初审":
          percent = "active";
          break;
        case "已提交初审未通过":
          percent = "exception";
          break;
        case "已初审未终审":
          percent = "active";
          break;
        case "已初审终审未通过":
          percent = "exception";
          break;
        case "已终审":
          percent = "success";
          break;
        default:
          break;
      }
      return percent;
    }

    const ListContent = ({ data: { subPerson, subTime, status } }) => {

      return (
        <div className={styles.listContent}>
          <div className={styles.listContentItem}>
            <span>申请人</span>
            <p>{subPerson.name}</p>
          </div>
          <div className={styles.listContentItem}>
            <span>申请时间</span>
            <p>{moment(subTime).format('YYYY-MM-DD HH:mm')}</p>
          </div>
          <div className={styles.listContentItem}>
            <span>状态</span>
            <p style={{ width: '120px' }}>{status.name}</p>
          </div>
          <div className={styles.listContentItem}>
            {/* <span>{status}</span> */}
            <Progress
              percent={getPercent(status.name)}
              status={getStatus(status.name)}
              strokeWidth={6}
              style={{
                width: 180,
              }}
            />
          </div>
        </div >
      )
    };

    const MoreBtn = ({ item }) => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, item)}>
            <Menu.Item key="edit">编辑</Menu.Item>
            <Menu.Item key="delete">删除</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <DownOutlined />
        </a>
      </Dropdown>
    );

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            status="success"
            title="操作成功"
            subTitle="一系列的信息描述，很短同样也可以带标点。"
            extra={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }

      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="任务名称" {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入任务名称',
                },
              ],
              initialValue: current.title,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="开始时间" {...this.formLayout}>
            {getFieldDecorator('createdAt', {
              rules: [
                {
                  required: true,
                  message: '请选择开始时间',
                },
              ],
              initialValue: current.createdAt ? moment(current.createdAt) : null,
            })(
              <DatePicker
                showTime
                placeholder="请选择"
                format="YYYY-MM-DD HH:mm:ss"
                style={{
                  width: '100%',
                }}
              />,
            )}
          </FormItem>
          <FormItem label="任务负责人" {...this.formLayout}>
            {getFieldDecorator('owner', {
              rules: [
                {
                  required: true,
                  message: '请选择任务负责人',
                },
              ],
              initialValue: current.owner,
            })(
              <Select placeholder="请选择">
                <SelectOption value="付晓晓">付晓晓</SelectOption>
                <SelectOption value="周毛毛">周毛毛</SelectOption>
              </Select>,
            )}
          </FormItem>
          <FormItem {...this.formLayout} label="产品描述">
            {getFieldDecorator('subDescription', {
              rules: [
                {
                  message: '请输入至少五个字符的产品描述！',
                  min: 5,
                },
              ],
              initialValue: current.subDescription,
            })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
          </FormItem>
        </Form>
      );
    };

    const status2Color = status => {
      const colorList = ['#7265e6', '#f56a00', '#d42a00'];  
      let color="";
      switch (status) {
        case "已提交未初审":
          color = colorList[0];
          break;
        case "已提交初审未通过":
          color = colorList[2];
          break;
        case "已初审未终审":
          color = colorList[0];
          break;
        case "已初审终审未通过":
          color = colorList[2];
          break;
        case "已终审":
          color = colorList[1];
          break;
        default:
          break;
      }
      return color; 
    }

    const ScrapAvatar = ({ scrap }) => {
      return <Avatar shape="square" size="large" style={{ backgroundColor: status2Color(scrap.status.name) }}>
        {scrap.tool?scrap.tool.code[0]:'废'}
      </Avatar>
    }

    return (
      <>
        <PageHeaderWrapper>
          <div className={styles.standardList}>
            
            <Card
              className={styles.listCard}
              bordered={false}
              title="报废申请列表"
              style={{
                marginTop: 24,
              }}
              bodyStyle={{
                padding: '0 32px 40px 32px',
              }}
              extra={extraContent}
            >
              <Button
                type="dashed"
                style={{
                  width: '100%',
                  marginBottom: 8,
                }}
                onClick={this.routerAppend}
                ref={component => {

                  this.addBtn = findDOMNode(component);
                }}
              >
                <PlusOutlined />
                添加
              </Button>
              <List
                size="large"
                rowKey="id"
                loading={loading}
                pagination={paginationProps}
                dataSource={list}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <a
                        key="edit"
                        onClick={e => {
                          e.preventDefault();
                          this.showEditModal(item);
                        }}
                      >
                        编辑
                      </a>,
                      <MoreBtn key="more" item={item} />,
                    ]}
                  >
                    <List.Item.Meta
                      // avatar={
                      //   <Avatar shape="square" size="large">
                      //     {item.name}
                      //   </Avatar>
                      //     }
                      avatar={<ScrapAvatar scrap={item}></ScrapAvatar>}
                      title={<a onClick={() => this.getProfile(item.id)}>{item.tool?item.tool.code:""}</a>}
                      description={item.description || "无"}
                    />
                    <ListContent data={item} />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </PageHeaderWrapper>

        <Modal
          title={done ? null : `任务${current ? '编辑' : '添加'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={
            done
              ? {
                padding: '72px 0',
              }
              : {
                padding: '28px 0 0',
              }
          }
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </>
    );
  }
}

export default connect(({ scraps, loading }) => ({
  scraps,
  loading: loading.models.scraps,
}))(Form.create()(Scraps));
