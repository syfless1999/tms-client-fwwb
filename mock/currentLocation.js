



const kuwei = {
  "id": 1,
  "name": "17-C1-2",
  "workcellId": 7,
  "deletion": 0,
  "x": 130,
  "y": 130,
};

const productLine = {
  "id": 1,
  "name": "BLKA10-L2",
  "workcellId": 7,
  "deletion": 0,
  "x": 300,
  "y": 250
}



const locations = [];
const productLines = [];


for (let i = 0; i < 5; i++) {
  const newKuwei = Object.assign({}, kuwei, {
    x: kuwei.x + i * 100,
    id: i
  });

  locations.push(newKuwei);
}

for (let i = 1; i < 4; i++) {
  const newKuwei = Object.assign({}, kuwei, {
    y: kuwei.y + i * 100,
    id: 5 + i
  });

  locations.push(newKuwei);
}


for (let i = 0; i < 5; i++) {
  const _new = Object.assign({}, productLine, {
    x: productLine.x + i * 50,
    id: i,
  });

  productLines.push(_new);
}

for (let i = 1; i < 4; i++) {
  const _new = Object.assign({}, productLine, {
    y: productLine.y + i * 50,
    id: 4 + i
  });

  productLines.push(_new);
}

const getLocation = (req, res) => {
  const {id} = req.params;
  return res.json({
    status: 'success',
    data: {
      locations: locations,
      productLines: productLines,
      type: "productLine",
      id: 4,
    }

  })
}

export default {
  // 'GET /api/tools/currentLocation/:id': getLocation,
}