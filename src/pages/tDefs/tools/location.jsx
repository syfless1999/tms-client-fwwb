import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';


import mapGraphRender from '@/components/MapGraph/render';
import { location2node } from '../../../utils/location';




const location = ({ data, width, height }) => {

    // ref
    const container = useRef();

    // 样式
    const containerStyle = {
        border: '1px solid #ccc',
        width: width + 40,
        height: height + 20
    };

    const canvasStyle = {
        margin: '10px auto',
        width,
        height
    };


    const nodes = location2node(data)
    useEffect(() => {
        // 数据
        const data = {
            nodes
        };

        // 容器
        const reactContainer = ReactDOM.findDOMNode(container.current);

        // 抽离渲染
        mapGraphRender(data, reactContainer, width, height);


    }, []);

    return (
        <div style={containerStyle}>
            <div ref={container} style={canvasStyle}></div>
        </div>
    )
}

export default location;
