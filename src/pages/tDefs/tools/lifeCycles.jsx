import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
// 获取一个生命周期的描述string
const lifeCycle2Description = lifeCycle => {
  // 之后再扩充一下

  return lifeCycle.description === "" ? "张三在2020年1月3日报修夹具" : lifeCycle.description;
}

const colors = [
  'blue', 'red', 'green', 'gray'
];

const LifeCycles = (props) => {
  const { data } = props;
  return (
    <Timeline mode="alternate">
      {data.map((item, index) => {
        if (index === data.length - 1) {
          return (
            <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>{lifeCycle2Description(item)}
            </Timeline.Item>
          )
        }
        return (
          <Timeline.Item color={colors[_.random(0, 3)]}>{lifeCycle2Description(item)}
          </Timeline.Item>
        )
      })}
    </Timeline >
  )
}



export default LifeCycles;