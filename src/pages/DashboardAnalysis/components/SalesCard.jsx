import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import numeral from 'numeral';
import { Bar } from './Charts';
import styles from '../style.less';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const rankingListData = [];

for (let i = 0; i < 7; i += 1) {
    rankingListData.push({
        title: formatMessage(
            {
                id: 'dashboardanalysis.analysis.test',
            },
            {
                no: i,
            },
        ),
        total: 323234,
    });
}

const SalesCard = ({
    rangePickerValue,
    salesData,
    isActive,
    handleRangePickerChange,
    loading,
    selectDate,
    rank,
}) => (
        <Card
            loading={loading}
            bordered={false}
            bodyStyle={{
                padding: 0,
            }}
        >
            <div className={styles.salesCard}>
                <Tabs
                    tabBarExtraContent={
                        <div className={styles.salesExtraWrap}>
                            <div className={styles.salesExtra}>
                                <a className={isActive('today')} onClick={() => selectDate('today')}>
                                    <FormattedMessage
                                        id="dashboardanalysis.analysis.all-day"
                                        defaultMessage="All Day"
                                    />
                                </a>
                                <a className={isActive('week')} onClick={() => selectDate('week')}>
                                    <FormattedMessage
                                        id="dashboardanalysis.analysis.all-week"
                                        defaultMessage="All Week"
                                    />
                                </a>
                                <a className={isActive('month')} onClick={() => selectDate('month')}>
                                    <FormattedMessage
                                        id="dashboardanalysis.analysis.all-month"
                                        defaultMessage="All Month"
                                    />
                                </a>
                                <a className={isActive('year')} onClick={() => selectDate('year')}>
                                    <FormattedMessage
                                        id="dashboardanalysis.analysis.all-year"
                                        defaultMessage="All Year"
                                    />
                                </a>
                            </div>
                            <RangePicker
                                value={rangePickerValue}
                                onChange={handleRangePickerChange}
                                style={{
                                    width: 256,
                                }}
                            />
                        </div>
                    }
                    size="large"
                    tabBarStyle={{
                        marginBottom: 24,
                    }}
                >
                    <TabPane
                        tab="出库量"
                        key="sales"
                    >
                        <Row>
                            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                                <div className={styles.salesBar}>
                                    <Bar
                                        height={295}
                                        title="出库趋势"
                                        data={salesData}
                                    />
                                </div>
                            </Col>
                            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                <div className={styles.salesRank}>
                                    <h4 className={styles.rankingTitle}>
                                        夹具出库量排行
                                    </h4>
                                    <ul className={styles.rankingList}>
                                        {rank.map((item, i) => (
                                            <li key={item.tDef}>
                                                <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                                                    {i + 1}
                                                </span>
                                                <span className={styles.rankingItemTitle} title={item.tDef}>
                                                    {item.tDef}
                                                </span>
                                                <span className={styles.rankingItemValue}>
                                                    {numeral(item.useCount).format('0,0')}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane
                        tab="故障量"
                        key="views"
                    >
                        <Row>
                            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                                <div className={styles.salesBar}>
                                    <Bar
                                        height={292}
                                        title="故障趋势"
                                        data={salesData}
                                    />
                                </div>
                            </Col>
                            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                <div className={styles.salesRank}>
                                    <h4 className={styles.rankingTitle}>
                                        夹具定义故障率排行
                                    </h4>
                                    <ul className={styles.rankingList}>
                                        {rank.map((item, i) => (
                                            <li key={item.tDef}>
                                                <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                                                    {i + 1}
                                                </span>
                                                <span className={styles.rankingItemTitle} title={item.tDef}>
                                                    {item.tDef}
                                                </span>
                                                <span className={styles.rankingItemValue}>
                                                    {numeral(item.useCount).format('0,0')}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>

                </Tabs>
            </div>
        </Card>
    );

export default SalesCard;
