import { Form } from '@ant-design/compatible';
import { Button, Divider, Dropdown, Menu, message, Icon, Card, Table, Popconfirm, Input, Select, Modal, Radio } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';



const EditableContext = React.createContext();
const { Option } = Select;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

// 表单单排格式
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

const getOptions = data => {
  const options = data.map(d => <Option key={d.id}>{d.name}</Option>);
  return options;

}
const workcellSelect = (data, selectChange) => (
  <>
    部门查询：<Select onChange={selectChange} style={{ width: 120 }} placeholder="选择部门">{getOptions(data)}</Select >
  </>
)

const extra = (appendWorkcell, appendUser) => (
  <div>
    <Button type="primary" onClick={appendWorkcell}>新建部门</Button>
    <Divider type="vertical" />
    <Button type="primary" onClick={appendUser}>添加用户</Button>
  </div>
)



class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave, userNo } = this.props;
    this.toggleEdit();

    handleSave({ ...record, position: e, no: userNo });

  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Select defaultValue="ROLE_operator1" ref={node => (this.input = node)} onPressEnter={this.save} onSelect={this.save} onBlur={this.save} >
        <Option value="ROLE_operator1">初级用户</Option>
        <Option value="ROLE_operator2">高级用户</Option>
        <Option value="ROLE_supervisor">监管员</Option>
        <Option value="ROLE_manager">Workcell经理</Option>
        <Option value="ROLE_admin">管理员</Option>
      </Select>
    ) : (
        <div
          className="editable-cell-value-wrap"
          //style={{ paddingRight: 24 }}
          onClick={this.toggleEdit}
        >
          {children}
        </div>
      );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      userNo,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
            children
          )}
      </td>
    );
  }
}


class TableList extends Component {

  state = {
    addVisible: false,
    newWorkcell: "",
    addUserVisible: false,
  }

  componentDidMount() {

    const { dispatch } = this.props;

    dispatch({
      type: 'user/fetchUsers',
      payload: {
        page: this.props.user.page,
        pageSize: 5
      }
    });

    dispatch({
      type: 'workcell/fetch',
    });
  }

  pageChange = page => {
    this.props.dispatch({
      type: 'user/fetchUsers',
      payload: {
        page: page,
        pageSize: 5
      }
    });
  }

  selectChange = value => {
    this.props.dispatch({
      type: 'user/fetchUsers',
      payload: {
        page: 1,
        pageSize: this.props.user.pageSize,
        workcell: value
      }
    });
  }

  addModalVisible = _ => {
    this.setState({
      addVisible: true
    })
  }

  addUserModal = _ => {

    this.setState({
      addUserVisible: true,
    })
  }

  handleOk = e => {
    this.props.dispatch({
      type: 'workcell/append',
      payload: {
        name: this.state.newWorkcell
      }
    });
    this.setState({
      addVisible: false,
      newWorkcell: ""
    });
  }

  userHandleOk = e => {
    // form校验
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 请求
        this.props.dispatch({
          type: "user/addUser",
          payload: values,
        }).then(res => {
          if (res && res.status === "success") {
            message.success("创建用户成功");
          }
        }).then(_ => {
          this.props.dispatch({
            type: 'user/fetchUsers',
            payload: {
              page: 1,
              pageSize: this.props.user.pageSize
            }
          });
        })

      }
    });

    this.setState({
      addUserVisible: false,
    });
  }

  handleCancel = e => {
    this.setState({
      addVisible: false,
    });
  }

  userHandleCancel = e => {
    this.setState({
      addUserVisible: false,
    });
  }

  inputChange = e => {
    const { value } = e.target;
    this.setState({
      newWorkcell: value,
    })
  }

  deleteConfirm = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/deleteUser',
      payload: {
        id: id,
      }
    }).then(res => {
      if (res && res.status === "success") {
        dispatch({
          type: 'user/fetchUsers',
          payload: {
            page: this.props.user.page,
            pageSize: 5
          }
        });
        message.success("删除成功");
      } else {
        message.error(res.description);
      }
    });
  }

  getPositionName = position => {
    const authorities = {
      'ROLE_operator1': "初级用户",
      'ROLE_operator2': "高级用户",
      'ROLE_supervisor': "监管员",
      'ROLE_manager': "workcell经理",
      'ROLE_admin': "管理员"
    };
    return authorities[position] || position;

  }

  columns = [
    {
      title: '部门',
      dataIndex: 'workcell',
      render: (text) => text.name ? text.name : "",
      width: '20%',
      //editable: true,
    },
    {
      title: '工号',
      dataIndex: 'no',
      width: '20%',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: '职位',
      dataIndex: 'position',
      width: '20%',
      render: (text) => text.name ?
        <span>{this.getPositionName(text.name)}<Divider type="vertical" /><Icon type="edit" /></span>
        : <span><Divider type="vertical" /></span>,
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: '20%',
      render: (text, record) => (
        <span>
          <Popconfirm title="确认要删除此用户吗？" onConfirm={() => this.deleteConfirm(record.id)} okText="确认" cancelText="取消">
            <Icon type="delete" />
          </Popconfirm>
        </span>
      )
    },
  ];

  handleSave = params => {
    const { position, no } = params;
    this.props.dispatch({
      type: "user/updateAuthority",
      payload: {
        position,
        no
      }
    }).then(res => {
      if (res && res.status === "success") {
        message.success("权限修改完成");
      }
    }).then(_ => {
      this.props.dispatch({
        type: 'user/fetchUsers',
        payload: {
          page: this.props.user.page,
          pageSize: 5
        }
      });
    })
  }

  render() {
    const { users, page, pageSize, total } = this.props.user;
    const { workcells } = this.props.workcell;
    const { loading, addLoading } = this.props;
    const { getFieldDecorator } = this.props.form;


    const pagination = {
      current: page,
      pageSize: pageSize,
      total: total,
      onChange: this.pageChange
    };

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          userNo: record.no,
          handleSave: this.handleSave,
        }),
      };
    });


    return (
      <PageHeaderWrapper>
        <Card
          title={workcellSelect(workcells, this.selectChange)}
          extra={extra(this.addModalVisible, this.addUserModal)}
        >
          <Table
            rowKey={record => record.no}
            dataSource={users || []}
            components={components}
            rowClassName={() => 'editable-row'}
            columns={columns}
            loading={loading}
            pagination={pagination}
          />
        </Card>
        <Modal
          title="添加新的部门"
          visible={this.state.addVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>请输入新部门的名称：</p>
          <p><Input defaultValue={this.state.newWorkcell} onChange={this.inputChange} /></p>
        </Modal>
        <Modal
          title="添加新用户"
          visible={this.state.addUserVisible}
          onOk={this.userHandleOk}
          onCancel={this.userHandleCancel}
        >
          <Form>
            <FormItem label="部门" {...formItemLayout}>
              {getFieldDecorator('workcell', {
                rules: [
                  {
                    required: true,
                    message: '部门不能为空',
                  },
                ],
              })(
                <Select
                  placeholder="请选择所在部门"
                >
                  {getOptions(workcells)}
                </Select>,
              )}
            </FormItem>
            <FormItem label="工号" {...formItemLayout}>
              {getFieldDecorator('no', {
                rules: [
                  {
                    required: true,
                    message: '工号不能为空',
                  },
                ],
              })(<Input placeholder="请输入工号" />)}
            </FormItem>
            <FormItem label="姓名" {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '姓名不能为空',
                  },
                ],
              })(<Input placeholder="请输入姓名" />)}
            </FormItem>
            <FormItem label="初始密码" {...formItemLayout}>
              {getFieldDecorator('pwd', {
                rules: [
                  {
                    required: true,
                    message: '初始密码不能为空',
                  },
                ],
                initialValue: "123456",
              })(<Input placeholder="请输入初始密码" />)}
            </FormItem>
            <FormItem label="职位" {...formItemLayout}>
              {getFieldDecorator('position', {
                rules: [
                  {
                    required: true,
                    message: '用户类型不能为空,请选择',
                  },
                ],
              })(
                <RadioGroup>
                  <Radio value={'ROLE_operator1'}>初级用户</Radio>
                  <Radio value={'ROLE_operator2'}>高级用户</Radio>
                  <Radio value={'ROLE_supervisor'}>监管员</Radio>
                  <Radio value={'ROLE_manager'}>Workcell经理</Radio>
                  <Radio value={'ROLE_admin'}>管理员</Radio>
                </RadioGroup>,
              )}
            </FormItem>
          </Form>
        </Modal>
      </PageHeaderWrapper >
    );
  };
}




export default connect(({ workcell, user, loading, addLoading }) => ({
  workcell,
  user,
  loading: loading.effects['workcell/fetch'],
  addLoading: loading.effects['workcell/append']
}))(Form.create()(TableList));


