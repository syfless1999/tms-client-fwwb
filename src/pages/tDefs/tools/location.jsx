import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';

import { location2node } from '../../../utils/location';


const location = ({ data }) => {

    // ref
    const container = useRef();

    const locations = location2node(data.locations, 'location');
    const productLines = location2node(data.productLines, 'productLine');
    const nodes = [...locations, ...productLines];


    useEffect(() => {
        const data = {
            nodes: nodes
        };

        const graph = new G6.Graph({
            container: ReactDOM.findDOMNode(container.current),
            width: 780,
            height: 560,
            defaultEdge: {
                color: '#e2e2e2',
                lineAppendWidth: 3,
            },
            defaultNode: {
                size: 50,
                style: {
                    fill: '#DEE9FF',
                    stroke: '#5B8FF9',
                },
                labelCfg: {
                    style: {
                        fontSize: 10,
                    }
                }
            },
            nodeStateStyles: {
                hover: {
                    lineWidth: 5,
                    fillOpacity: 1,
                },
            },
            edgeStateStyles: {
                hover: {
                    lineWidth: 3,
                },
            },
        });
        graph.data(data);
        graph.render();

    }, []);

    return (
        <div>
            <div ref={container} style={{ border: '1px solid #ccc' }}></div>
        </div>
    )
}

export default location;
