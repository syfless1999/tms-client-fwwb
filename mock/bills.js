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


const bills = [{
  id: 1,
  tDef: tDef,
  subPerson: subPerson,
  subTime: new Date(),
  status: "已提交未初审",
  image: covers[0],
  number: 3,
},
{
  id: 2,
  tDef: tDef,
  subPerson: subPerson,
  subTime: new Date(),
  status: "已提交初审未通过",
  image: covers[1],
  firstPerson: firstPerson,
  firstTime: new Date(),
  number: 3,

},
{
  id: 3,
  tDef: tDef,
  subPerson: subPerson,
  subTime: new Date(),
  status: "已初审未终审",
  image: covers[2],
  firstPerson: firstPerson,
  firstTime: new Date(),
  number: 3,

},
{
  id: 4,
  tDef: tDef,
  subPerson: subPerson,
  subTime: new Date(),
  status: "已初审终审未通过",
  image: covers[3],
  firstPerson: firstPerson,
  firstTime: new Date(),
  secondPerson: secondPerson,
  secondTime: new Date(),
  number: 3,

},
{
  id: 5,
  tDef: tDef,
  subPerson: subPerson,
  subTime: new Date(),
  status: "已终审",
  image: avatars[0],
  firstPerson: firstPerson,
  firstTime: new Date(),
  secondPerson: secondPerson,
  secondTime: new Date(),
  number: 3,

},
{
  id: 6,
  tDef: tDef,
  subPerson: subPerson,
  subTime: new Date(),
  status: "已提交未初审",
  image: avatars[1],
  number: 3,

},
{
  id: 7,
  tDef: tDef,
  subPerson: subPerson,
  subTime: new Date(),
  status: "已提交未初审",
  image: avatars[2],
  number: 3,

},
{
  id: 8,
  tDef: tDef,
  subPerson: subPerson,
  subTime: new Date(),
  status: "已提交未初审",
  image: avatars[3],
  number: 3,

},
{
  id: 9,
  tDef: tDef,
  subPerson: subPerson,
  subTime: new Date(),
  status: "已提交未初审",
  image: avatars[4],
},
{
  id: 10,
  tDef: tDef,
  subPerson: subPerson,
  subTime: new Date(),
  status: "已提交未初审",
  image: avatars[5],
  number: 3,

},
{
  id: 11,
  tDef: tDef,
  subPerson: subPerson,
  subTime: new Date(),
  status: "已提交未初审",
  image: avatars[6],
  number: 3,

},
];

function fakeBills(page, pageSize, status) {
  let res = bills.concat();
  if (status != 0) {
    res = res.filter(bill => bill.status === status);
  }
  const total = res.length;
  let start = (page - 1) * pageSize;
  let end = Math.min(page * pageSize, res.length);

  return {
    bills: res.slice(start, end),
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
function getBillList(req, res) {
  let {
    page,
    pageSize,
    status
  } = req.query;

  if (!page) page = 1;
  if (!pageSize) pageSize = 5;
  if (!status) status = 0;

  const result = fakeBills(page, pageSize, status);


  return res.json({
    status: "success",
    data: result
  });
}

function postBill(req, res) {
  const newBill = {
    id: bills.length + 1,
    tDef: tDef,
    subPerson: subPerson,
    subTime: new Date(),
    status: "已终审",
    image: avatars[6],
  };
  bills.push(newBill);
  res.json({
    status: "success",
    data: {
      bill: newBill
    }
  })
}

function getInfo(req, res) {
  const { id } = req.params;
  const info = bills.find(bill => bill.id === +id);
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
  const bill = bills.find(bill => bill.id === +id);
  bill.status = status || bill.status;
  if (status === ("已提交初审未通过") || status === ("已初审未终审")) {
    bill.firstPerson = firstPerson;
    bill.firstTime = new Date();
  } else if (status === ("已初审终审未通过") || status === ("已终审")) {
    bill.firstPerson = bill.firstPerson || secondPerson;
    bill.firstTime = bill.firstTime || new Date();
    bill.secondPerson = secondPerson;
    bill.secondTime = new Date();
  }
  return res.json({
    status: "success",
    data: {
      bill: bill
    }
  });

}

export default {
  'GET  /api/fake_list': getFakeList,
  'GET /api/bills': getBillList,
  'POST /api/bills': postBill,
  'POST  /api/fake_list': postFakeList,
  'GET /api/bills/:id': getInfo,
  'PATCH /api/bills/:id/firstCheck': patchCheck,
  'PATCH /api/bills/:id/secondCheck': patchCheck,
};
