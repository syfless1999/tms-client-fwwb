import { Avatar } from 'antd';
import { authority2Number } from '../utils/Authorized';

const index = ({ status }) => {
  const fontList = ['初', '高', '监', '经', '系'];
  const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#87d068'];

  if (typeof status === 'string') status = authority2Number(status);

  return (<Avatar style={{ backgroundColor: colorList[status], verticalAlign: 'middle' }} size="large">
    {fontList[status]}
  </Avatar>)
}


export default index;