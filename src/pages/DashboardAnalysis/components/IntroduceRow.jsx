import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import numeral from 'numeral';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from './Charts';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: {
        marginBottom: 24,
    },
};

const IntroduceRow = ({ loading,
    visitData,
    toolIntroduceInfo: {
        toolInfo,
        useInfo,
        failureInfo,
        scrapInfo,
    } }) => (
        <Row gutter={24} type="flex">
            <Col {...topColResponsiveProps}>
                <ChartCard
                    bordered={false}
                    title="夹具实体总数"
                    action={
                        <Tooltip
                            title="每条夹具定义下有多个夹具实体"
                        >
                            <InfoCircleOutlined />
                        </Tooltip>
                    }
                    loading={loading}
                    total={toolInfo && toolInfo.toolNum}
                    footer={
                        <Field
                            label="夹具定义总数"
                            value={toolInfo && toolInfo.tDefNum}
                        />
                    }
                    contentHeight={46}
                >
                    <Trend
                        flag="up"
                        style={{
                            marginRight: 16,
                        }}
                    >
                        <FormattedMessage id="dashboardanalysis.analysis.week" defaultMessage="Weekly Changes" />
                        <span className={styles.trendText}>12%</span>
                    </Trend>
                    <Trend flag="down">
                        <FormattedMessage id="dashboardanalysis.analysis.day" defaultMessage="Daily Changes" />
                        <span className={styles.trendText}>11%</span>
                    </Trend>
                </ChartCard>
            </Col>

            <Col {...topColResponsiveProps}>
                <ChartCard
                    bordered={false}
                    loading={loading}
                    title="夹具使用总次数"
                    action={
                        <Tooltip
                            title="夹具出库总次数为夹具出库的总次数"
                        >
                            <InfoCircleOutlined />
                        </Tooltip>
                    }
                    total={useInfo && useInfo.allUseRecordNum}
                    footer={
                        <Field
                            label="日出库次数"
                            value={useInfo && useInfo.todayUseRecordNum}
                        />
                    }
                    contentHeight={46}
                >
                    <MiniArea color="#975FE4" data={visitData} />
                </ChartCard>
            </Col>

            <Col {...topColResponsiveProps}>
                <ChartCard
                    bordered={false}
                    loading={loading}
                    title="夹具故障总次数"
                    action={
                        <Tooltip
                            title="夹具故障概率：有报修记录的夹具数 / 夹具总数"
                        >
                            <InfoCircleOutlined />
                        </Tooltip>
                    }
                    total={numeral(failureInfo && failureInfo.failureNum).format('0,0')}
                    footer={
                        <Field
                            label="夹具故障率"
                            value={failureInfo && numeral(failureInfo.failureRate).format("0.00%")}
                        />
                    }
                    contentHeight={46}
                >
                    <MiniBar data={visitData} />
                </ChartCard>
            </Col>

            <Col {...topColResponsiveProps}>
                <ChartCard
                    loading={loading}
                    bordered={false}
                    title="夹具报废率"
                    action={
                        <Tooltip
                            title="夹具报废率：报废夹具数量 / 夹具总数"
                        >
                            <InfoCircleOutlined />
                        </Tooltip>
                    }
                    total={scrapInfo && numeral(scrapInfo.scrapRate).format("0.00%")}
                    footer={
                        <div
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                            }}
                        >
                            <Trend
                                flag="up"
                                style={{
                                    marginRight: 16,
                                }}
                            >
                                <FormattedMessage
                                    id="dashboardanalysis.analysis.week"
                                    defaultMessage="Weekly Changes"
                                />
                                <span className={styles.trendText}>12%</span>
                            </Trend>
                            <Trend flag="down">
                                <FormattedMessage
                                    id="dashboardanalysis.analysis.day"
                                    defaultMessage="Weekly Changes"
                                />
                                <span className={styles.trendText}>11%</span>
                            </Trend>
                        </div>
                    }
                    contentHeight={46}
                >
                    <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
                </ChartCard>
            </Col>
        </Row>
    );

export default IntroduceRow;
