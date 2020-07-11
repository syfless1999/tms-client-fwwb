import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment } from 'react';
import { List , Form } from 'antd';
import  ChangePwd  from './changePwd';
import  ChangeEmail  from './changeEmail';

const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage id="accountsettings.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="accountsettings.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="accountsettings.security.weak" defaultMessage="Weak" />
      Weak
    </span>
  ),
};

class SecurityView extends Component {
  state = { 
    visiblePwd: false,
    visibleEmail: false 
  };

  showPwdEditModal = () => {
    this.setState({
      visiblePwd: true,
    });
  };

  showEmailEditModal = () => {
    this.setState({
      visibleEmail: true,
    });
  };

  handleCancelPwd = e => {
    this.setState({
      visiblePwd: false,
    });
  };

  handleCancelEmail = e => {
    this.setState({
      visibleEmail: false,
    });
  };
  
  getData = () => [
    {
      title: formatMessage(
        {
          id: 'accountsettings.security.password',
        },
        {},
      ),
      description: (
        <Fragment>
          {formatMessage({
            id: 'accountsettings.security.password-description',
          })}
          ：{passwordStrength.strong}
        </Fragment>
      ),
      actions: [
        <a key="changePwd"
          onClick={e => {
           e.preventDefault();
           this.showPwdEditModal();
          }}
        >修改密码</a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountsettings.security.email',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'accountsettings.security.email-description',
        },
        {},
      )}：****.com`,
      actions: [
        <a key="changeEmail"
          onClick={e => {
           e.preventDefault();
           this.showEmailEditModal();
          }}
        >修改邮箱</a>,
      ],
    },
  ];

  render() {
    const data = this.getData();

    return (
      <div>
        <Fragment>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item actions={item.actions}>
                <List.Item.Meta title={item.title} description={item.description} />
              </List.Item>
            )}
          />
        </Fragment>

        <ChangePwd   
          onCancel = {this.handleCancelPwd}
          visible = {this.state.visiblePwd} />

        <ChangeEmail   
          onCancel = {this.handleCancelEmail}
          visible = {this.state.visibleEmail} />

        
      </div>
    );
  }
}

export default Form.create()(SecurityView);