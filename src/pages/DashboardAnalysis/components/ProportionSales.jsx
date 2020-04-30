import { Card, Radio } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { Pie } from './Charts';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const ProportionSales = ({
    title,
    secondTitle,
    circleTitle,
    dropdownGroup,
    salesType,
    loading,
    salesPieData,
    handleChangeSalesType,
    unit,
}) => (
        <Card
            loading={loading}
            className={styles.salesCard}
            bordered={false}
            title={title}
            style={{
                height: '100%',
            }}
            extra={
                <div className={styles.salesCardExtra}>
                    {dropdownGroup}
                    <div className={styles.salesTypeRadio}>
                        <Radio.Group value={salesType} onChange={handleChangeSalesType}>
                            <Radio.Button value="all">
                                <FormattedMessage id="dashboardanalysis.channel.all" defaultMessage="ALL" />
                            </Radio.Button>
                            <Radio.Button value="online">
                                <FormattedMessage id="dashboardanalysis.channel.online" defaultMessage="Online" />
                            </Radio.Button>
                            <Radio.Button value="stores">
                                <FormattedMessage id="dashboardanalysis.channel.stores" defaultMessage="Stores" />
                            </Radio.Button>
                        </Radio.Group>
                    </div>
                </div>
            }
        >
            <div>
                <h4
                    style={{
                        marginTop: 8,
                        marginBottom: 32,
                    }}
                >
                    {secondTitle}
                </h4>
                <Pie
                    hasLegend
                    subTitle={circleTitle}
                    total={salesPieData.reduce((pre, now) => now.y + pre, 0)}
                    data={salesPieData}
                    valueFormat={value => <span>{value}{unit}</span>}
                    height={248}
                    lineWidth={4}
                />
            </div>
        </Card>
    );

export default ProportionSales;
