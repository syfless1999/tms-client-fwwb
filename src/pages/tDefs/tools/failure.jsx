import React, { useRef, useEffect } from 'react'
import { Liquid } from '@antv/g2plot';
import { Typography } from 'antd';



const failure = ({ data }) => {
  data *= 10000;

  const container1 = useRef();

  useEffect(() => {
    if (!container1.current) return;

    const liquidPlot = new Liquid(container1.current, {
      title: {
        visible: true,
        text: '故障概率',
      },
      description: {
        visible: true,
        text: '故障概率图 - 百分比显示',
      },
      min: 0,
      max: 10000,
      value: data,
      statistic: {
        formatter: (value) => ((100 * value) / 10000).toFixed(1) + '%',
      },
    });

    liquidPlot.render();

  }, []);

  return (
    <div>
      <div ref={container1}></div>
    </div>
  )
}

export default failure;
