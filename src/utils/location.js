// 把后台节点数据转换成g6节点数据
export const location2node = (data) => {

    // 两种位置对应不同的显示形式
    let display = {
        // 库位
        location: {
            nodeType: 'ellipse',
            label: '库位',
            color: '#7ee215',
            lineWidth: 3,
            size:[70,40]
        },
        // 生产线
        productLine: {
            nodeType: 'rect',
            label: '生产线',
            color: '#00c6f7',
            lineWidth: 2,
            size:[70,40]
        }
    }
    const locations = data.locations.map(item => {
        return {
            ...item,
            type: 'location'
        }
    });
    const productLines = data.productLines.map(item => {
        return {
            ...item,
            type: 'productLine'
        }
    });
    let nodes = [...locations, ...productLines];

    let res = nodes.map(item => {
        const { type } = item;
        let node = {
            ...item,
            label: display[type].label + '\n' + item.name,
            type: display[type].nodeType,
            size: display[type].size,
            style: {
                fill: display[type].color,
                lineWidth: display[type].lineWidth,
            }
        };
        if (type === data.type && node.id === data.id) {
            node.style.fill = "#f03036";
            node.labelCfg = {
                style: {
                    fill: 'white'
                }
            };
        }
        return node;
    });
    return res;
};


