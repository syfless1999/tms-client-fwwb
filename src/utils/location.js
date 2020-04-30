


// 把后台节点数据转换成g6节点数据
export const location2node = (data, type) => {

    let nodeType = "";
    switch (type) {
        case "location":
            nodeType = 'ellipse';
            break;
        case "productLine":
            nodeType = 'rect';
            break;
        default:
            break;
    }
    return data.map(item => {
        let node = {
            ...item,
            label: item.name,
            type: nodeType
        };
        if (node.type === 'ellipse') {
            node.label += "库位";
            node.style = {
                fill: "#7ee215",
                lineWidth: 3,
            };
        }
        if (node.type === 'rect') {
            node.label += "生产线";
            node.style = {
                fill: "#00c6f7",
                lineWidth: 2,
            };
        }
        return node;
    })
}