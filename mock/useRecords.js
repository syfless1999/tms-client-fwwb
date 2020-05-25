const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];
const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];
const user = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
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

const firstPerson = {
  id: 3,
  name: "ozj"
}

const secondPerson = {
  id: 4,
  name: "sxy"
}


const useRecords = [
  {
    id: 48,
    location: {
      id: 1,
      name: "17-C1-2",
      workcell: {
        id: 7,
        name: "JW05"
      },
      x: 100,
      y: 100
    },
    productLine: {
      name: "JCXA02_L3",
      no: 37,
      workcell: {
        id: 7,
        name: "JW05"
      },
      x: 50,
      y: 450
    },
    recorder: {
      email: "2956901287@qq.com",
      id: 5,
      name: "Li Wang3",
      no: "1215074",
      position: {
        id: 1,
        name: "ROLE_operator1"
      },
      workcell: {
        id: 7,
        name: "JW05"
      }
    },
    staff: {
      email: "1111@qq.com",
      id: 2,
      name: "ooo",
      no: "1234567"
    },
    status: {
      id: 1,
      name: "出库"
    },
    time: "2003-05-01 13:15:00",
    tool: {
      billNo: "BO19070500000008",
      code: "LM2132-3",
      id: 38,
      location: {
        id: 1,
        name: "17-C1-2",
        workcell: {
          id: 7,
          name: "JW05"
        },
        x: 100,
        y: 100
      },
      rate: 0.0,
      regDate: "2019-10-01 12:41:00",
      seqId: 1,
      status: {
        id: 1,
        name: "在产线"
      },
      tDef: {
        code: "LM2132-3",
        editOn: "2020-01-14 11:49:13",
        family: "BFC SQ 2218",
        familyId: 1,
        id: 1184,
        maxCount: 0,
        model: "BFC SQ 2218 B42",
        name: "BFC SQ 2218 B42 螺丝紧固夹具",
        partNo: "KBZ233500/1",
        pmPeriod: 30,
        recOn: "2020-01-14 11:15:18",
        recer: {
          email: "2956901287@qq.com",
          id: 2,
          name: "Xianghai Zhang",
          no: "1215072",
          position: {
            id: 2,
            name: "ROLE_operator2"
          },
          workcell: {
            id: 7,
            name: "JW05"
          }
        },
        upl: 11,
        workcell: {
          id: 7,
          name: "JW05"
        }
      },
      usedCount: 11
    }
  },
  {
    id: 48,
    location: {
      id: 1,
      name: "17-C1-2",
      workcell: {
        id: 7,
        name: "JW05"
      },
      x: 100,
      y: 100
    },
    productLine: {
      name: "JCXA02_L3",
      no: 37,
      workcell: {
        id: 7,
        name: "JW05"
      },
      x: 50,
      y: 450
    },
    recorder: {
      email: "2956901287@qq.com",
      id: 5,
      name: "Li Wang3",
      no: "1215074",
      position: {
        id: 1,
        name: "ROLE_operator1"
      },
      workcell: {
        id: 7,
        name: "JW05"
      }
    },
    staff: {
      email: "1111@qq.com",
      id: 2,
      name: "ooo",
      no: "1234567"
    },
    status: {
      id: 1,
      name: "出库"
    },
    time: "2003-05-01 13:15:00",
    tool: {
      billNo: "BO19070500000008",
      code: "LM2132-3",
      id: 38,
      location: {
        id: 1,
        name: "17-C1-2",
        workcell: {
          id: 7,
          name: "JW05"
        },
        x: 100,
        y: 100
      },
      rate: 0.0,
      regDate: "2019-10-01 12:41:00",
      seqId: 1,
      status: {
        id: 1,
        name: "在产线"
      },
      tDef: {
        code: "LM2132-3",
        editOn: "2020-01-14 11:49:13",
        family: "BFC SQ 2218",
        familyId: 1,
        id: 1184,
        maxCount: 0,
        model: "BFC SQ 2218 B42",
        name: "BFC SQ 2218 B42 螺丝紧固夹具",
        partNo: "KBZ233500/1",
        pmPeriod: 30,
        recOn: "2020-01-14 11:15:18",
        recer: {
          email: "2956901287@qq.com",
          id: 2,
          name: "Xianghai Zhang",
          no: "1215072",
          position: {
            id: 2,
            name: "ROLE_operator2"
          },
          workcell: {
            id: 7,
            name: "JW05"
          }
        },
        upl: 11,
        workcell: {
          id: 7,
          name: "JW05"
        }
      },
      usedCount: 11
    }
  },
];

function fakeUseRecords(page, pageSize, status) {
  let res = useRecords.concat();
  if (status != 0) {
    res = res.filter(useRecord => useRecord.status === status);
  }
  const total = res.length;
  let start = (page - 1) * pageSize;
  let end = Math.min(page * pageSize, res.length);

  return {
    useRecords: res.slice(start, end),
    total: total
  };
}


function fakeList(count) {
  const list = [];

  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(`${i / 4}`, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      subDescription: desc[i % 5],
      description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members: [{
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
        name: '曲丽丽',
        id: 'member1',
      },
      {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
        name: '王昭君',
        id: 'member2',
      },
      {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
        name: '董娜娜',
        id: 'member3',
      },
      ],
    });
  }

  return list;
}

let sourceData = [];

function getFakeList(req, res) {
  const params = req.query;
  const count = params.count * 1 || 20;
  const result = fakeList(count);
  sourceData = result;
  return res.json(result);
}

/**
 * 获取所有入库订单
 */
function getUseRecordList(req, res) {
  let {
    page,
    pageSize,
    status
  } = req.query;

  if (!page) page = 1;
  if (!pageSize) pageSize = 5;
  if (!status) status = 0;

  const result = fakeUseRecords(page, pageSize, status);


  return res.json({
    status: "success",
    data: result
  });
}

function postUseRecord(req, res) {
  const newUseRecords = {
    id: useRecords.length + 1,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "出库",
    image: avatars[6],
  };
  useRecords.push(newUseRecords);
  res.json({
    status: "success",
    data: {
      useRecord: newUseRecords
    }
  })
}

function getInfo(req, res) {
  const { id } = req.params;
  const info = useRecords.find(useRecord => useRecord.id === +id);
  return res.json({
    status: "success",
    data: {
      info: info
    }
  });
}

function postFakeList(req, res) {
  const {
    /* url = '', */
    body,
  } = req; // const params = getUrlParams(url);

  const {
    method,
    id
  } = body; // const count = (params.count * 1) || 20;

  let result = sourceData || [];

  switch (method) {
    case 'delete':
      result = result.filter(item => item.id !== id);
      break;

    case 'update':
      result.forEach((item, i) => {
        if (item.id === id) {
          result[i] = {
            ...item,
            ...body
          };
        }
      });
      break;

    case 'post':
      result.unshift({
        ...body,
        id: `fake-list-${result.length}`,
        createdAt: new Date().getTime(),
      });
      break;

    default:
      break;
  }

  return res.json({
    status: "success",
    data: result
  });
}


function patchCheck(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const useRecord = useRecords.find(useRecord => useRecord.id === +id);
  useRecord.status = status || useRecord.status;
  if (status === ("已提交初审未通过") || status === ("已初审未终审")) {
    useRecord.firstPerson = firstPerson;
    useRecord.firstTime = new Date();
  } else if (status === ("已初审终审未通过") || status === ("已终审")) {
    useRecord.firstPerson = useRecord.firstPerson || secondPerson;
    useRecord.firstTime = useRecord.firstTime || new Date();
    useRecord.secondPerson = secondPerson;
    useRecord.secondTime = new Date();
  }
  return res.json({
    status: "success",
    data: {
      useRecord: useRecord
    }
  });

}

export default {
  // 'GET  /api/fake_list': getFakeList,
  // 'GET /api/useRecords': getUseRecordList,
  // 'POST /api/useRecords': postUseRecord,
  // 'POST  /api/fake_list': postFakeList,
  // 'GET /api/useRecords/:id': getInfo,
  // 'PATCH /api/useRecords/:id/firstCheck': patchCheck,
  // 'PATCH /api/useRecords/:id/secondCheck': patchCheck,
};
