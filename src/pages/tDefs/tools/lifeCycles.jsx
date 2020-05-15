import { Timeline, Typography,Popover,Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { router } from 'umi';
import _ from 'lodash';

const { Text } = Typography;

// 获取一个生命周期的描述string
const lifeCycle2Description = lifeCycle => {
    // 之后再扩充一下

    let desc = _.trim(lifeCycle.description);
    return desc.length ? lifeCycle.description : "张三在2020年1月3日报修夹具";
}

const colors = [
    'blue', 'red', 'green', 'gray'
];

// 1	UseRecord
// 2	RepairApp
// 3	Scrap
// 5	Bill
const getRoute = (item) => {
    const type = +item.status.id,
        id = item.recordId;
    let route = "useRecords";
    switch (type) {
        case 1:
            route = 'useRecords'
            break;
        case 2:
            route = 'repairs';
            break;
        case 3:
            route = 'scraps';
            break;
        case 5:
            route = 'bills';
            break;
        default:
            break;
    }
    return `/${route}/${id}`;
}

const toDetail = (item) => {
    const route = getRoute(item);
    router.replace(route);
}


const popContent = (lifeCycle) => (
    <div>
        <p><Text mark>阶段</Text>   {lifeCycle.status.name}</p>
        <p><Text mark>阶段编号</Text>   {lifeCycle.recordId}</p>
        <p><Text mark>发生时间</Text>   {lifeCycle.time}</p>
        <p style={{textAlign:'center'}}><Button type="primary" onClick={() => toDetail(lifeCycle)}>   查看详情</Button></p>
    </div>
)


const LifeCycles = ({ data }) => {
    return (
        <Timeline mode="alternate">
            {data.map((item, index) => {
                let TimelineItem = index === data.length - 1 ?
                    (
                        <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>{lifeCycle2Description(item)}
                        </Timeline.Item>)
                    :
                    (
                        <Timeline.Item color={colors[_.random(0, 3)]}>{lifeCycle2Description(item)}
                        </Timeline.Item>
                    );
                return (
                    <Popover content={popContent(item)} title="阶段详情">
                        {TimelineItem}
                    </Popover>
                )

            })}
        </Timeline >
    )
}



export default LifeCycles;