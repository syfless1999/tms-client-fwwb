import G6 from '@antv/g6';


const mapGraphRender =
    (data, container, width, height, middleFn) => {
        // 地图配置项
        const mapGraphConfig = {
            container: container,
            width: width,
            height: height,
            defaultEdge: {
                color: '#e2e2e2',
                lineAppendWidth: 3,
            },
            defaultNode: {
                size: 70,
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
        };

        const graph = new G6.Graph(mapGraphConfig);
        graph.data(data);
        graph.render();


    }

    export default mapGraphRender;