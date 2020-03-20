

const done = "已关闭";

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];

const tDef = {
  code: "EF2189",
  name: "EF2189",
  family: "JABIL FU",
  familyId: 79,
  partNo: "PNA90320/1 PNA90320/2 PNA90322/1",
  upl: 3,
  usedFor: "打调谐盖板",
  pmPeriod: 30,
  workcell: 1
}
const subPerson = {
  id: 2,
  name: "syf"
}

const checkPerson = {
  id: 3,
  name: "ozj"
}

const repairs = [
  {
    id: 1,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    description: '螺丝坏了',
    image: covers[0],
  },
  {
    id: 2,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已关闭",
    description: '螺丝坏了',
    image: covers[1],
    checkPerson: checkPerson,
    checkTime:new Date(),
  },
  {
    id: 3,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    description: '螺丝坏了',
    image: covers[2],
  },
  {
    id: 4,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    description: '螺丝坏了',
    image: covers[3],
  },
  {
    id: 5,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已关闭",
    description: '螺丝坏了',
    image: covers[3],
    checkPerson: checkPerson,
    checkTime:new Date(),

  },
  {
    id: 6,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    description: '螺丝坏了',
    image: covers[2],
  },
  {
    id: 7,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    description: '螺丝坏了',
    image: covers[1],
  },
  {
    id: 8,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    description: '螺丝坏了',
    image: covers[0],
  },
  {
    id: 9,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    description: '螺丝坏了',
    image: covers[2],
  },
  {
    id: 10,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    description: '螺丝坏了',
    image: covers[1],
  },
  {
    id: 11,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已关闭",
    description: '螺丝坏了',
    image: covers[3],
    checkPerson: checkPerson,
    checkTime:new Date(),

  },
  {
    id: 12,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    description: '螺丝坏了',
    image: covers[0],
  },
  {
    id: 13,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已关闭",
    description: '螺丝坏了',
    image: covers[1],
    checkPerson: checkPerson,
    checkTime:new Date(),

  },
  {
    id: 14,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    description: '螺丝坏了',
    image: covers[2],
  },
  {
    id: 15,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    description: '螺丝坏了',
    image: covers[3],
  },
  {
    id: 16,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已关闭",
    description: '螺丝坏了',
    image: covers[3],
    checkPerson: checkPerson,
    checkTime:new Date(),

  },
  {
    id: 17,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    description: '螺丝坏了',
    image: covers[2],
  },
  {
    id: 18,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    description: '螺丝坏了',
    image: covers[1],
  },
  {
    id: 19,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    description: '螺丝坏了',
    image: covers[0],
  },
  {
    id: 20,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    description: '螺丝坏了',
    image: covers[2],
  },
  {
    id: 21,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    description: '螺丝坏了',
    image: covers[1],
  },
  {
    id: 22,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已关闭",
    description: '螺丝坏了',
    image: covers[3],
    checkPerson: checkPerson,
    checkTime:new Date(),

  },
];

function fakeRepairs(page, pageSize, status) {
  let res = repairs.concat();
  if (status != 0) {
    res = res.filter(bill => bill.status === status);
  }
  const total = res.length;
  let start = (page - 1) * pageSize;
  let end = Math.min(page * pageSize, res.length);

  return {
    repairApps: res.slice(start, end),
    total: total
  };
}


/**
 * 获取所有报修记录
 */
function getRepairList(req, res) {
  let {
    page,
    pageSize,
    status
  } = req.query;

  if (!page) page = 1;
  if (!pageSize) pageSize = 16;
  if (!status) status = 0;

  const result = fakeRepairs(page, pageSize, status);


  return res.json({
    status: "success",
    data: result
  });
}

function postRepair(req, res) {
  const newRepair = {
    id: repairs.length + 1,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已提交未处理",
    checkPerson: {},
    image: covers[1],
    description: "new description",
  };
  repairs.push(newRepair);
  res.json({
    status: "success",
    data: {
      repairApp: newRepair
    }
  })
}

function getInfo(req, res) {
  const { id } = req.params;
  console.log(id);
  const info = repairs.find(repair => repair.id === +id);
  return res.json({
    status: "success",
    data: {
      repairApp: info
    }
  });
}



function patchCheck(req, res) {
  const { id } = req.params;
  // 这个时间暂时没用
  const { checkTime } = req.body;
  const repair = repairs.find(repair => repair.id === +id);
  repair.status = done;
  repair.checkTime = new Date();
  repair.checkPerson = checkPerson;

  return res.json({
    status: "success",
    data: {
      repairApp: repair
    }
  });

}

export default {
  'GET /api/repairApps': getRepairList,
  'POST /api/repairApps': postRepair,
  'GET /api/repairApps/:id': getInfo,
  'PATCH /api/repairApps/:id': patchCheck,
};


