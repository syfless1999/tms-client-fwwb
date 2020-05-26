import { Card, Col, Form, List, Row, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import { router } from 'umi';
import { IMAGE_URL_SUFFIX } from '../../constants';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;




const Repairs = ({ dispatch, repairs: { list = [], total }, loading }) => {

  const [params, setParams] = useState({
    page: 1,
    pageSize: 4,
    status: null
  })

  useEffect(() => {
    const { page, pageSize, status } = params;
    const payload = { page, pageSize };
    if (status) payload.status = status;
    dispatch({
      type: 'repairs/fetch',
      payload,
    });
  }, [params]);

  const getInfo = id => {
    router.replace(`/repairs/${id}`);
  }


  // 更改页码
  const pageChange = page => {
    setParams({
      ...params,
      page
    })
  }


  const cardList = list && (
    <List
      rowKey="id"
      loading={loading}
      grid={{
        gutter: 24,
        xl: 4,
        lg: 3,
        md: 3,
        sm: 2,
        xs: 1,
      }}
      pagination={{
        onChange: pageChange,
        pageSize: params.pageSize,
        total: total,
      }}
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Card
            className={styles.card}
            hoverable
            cover={<img src={IMAGE_URL_SUFFIX + item.image} onClick={() => getInfo(item.id)} />}>
            <Card.Meta
              title={<a>{item.tool.tDef.name}</a>}
              description={
                <Paragraph
                  className={styles.item}
                  ellipsis={{
                    rows: 2,
                  }}
                >
                  {item.description}
                </Paragraph>
              }
            />
            {/* <div className={styles.cardItemContent}>
              <span>{moment(item.updatedAt).fromNow()}</span>
              <div className={styles.avatarList}>
                <AvatarList size="small">
                  {item.members.map((member, i) => (
                    <AvatarList.Item
                      key={getKey(item.id, i)}
                      src={member.avatar}
                      tips={member.name}
                    />
                  ))}
                </AvatarList>
              </div>
            </div> */}
          </Card>
        </List.Item>
      )}
    />
  );
  const formItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  return (
    <div className={styles.coverCardList}>
      <Card bordered={false}>
        <Form
          layout="inline"
        >
          <StandardFormRow
            title="所属类目"
            block
            style={{
              paddingBottom: 11,
            }}
          >
            <FormItem name="category">
              <TagSelect expandable>
                <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                <TagSelect.Option value="cat7">类目七</TagSelect.Option>
                <TagSelect.Option value="cat8">类目八</TagSelect.Option>
                <TagSelect.Option value="cat9">类目九</TagSelect.Option>
                <TagSelect.Option value="cat10">类目十</TagSelect.Option>
                <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
                <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="好评度" name="rate">
                  <Select
                    placeholder="不限"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                  >
                    <Option value={0}>未修</Option>
                    <Option value={1}>已修</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
    </div>
  );
};

export default connect(({ repairs, loading }) => ({
  repairs,
  loading: loading.models.repairs,
}))(Repairs);
