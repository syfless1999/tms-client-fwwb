function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

// 暂定传送默认的token
const adminToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzkxNDU1NDgsImV4cCI6MTU3OTE0OTE0OCwiYXVkIjoiMTIzMDkzNiIsInBvc3Rpb24iOiJzdXBlcnZpc29yIiwicGFzc3dvcmQiOiIxMjM0NTYifQ.H1VFIy6531u6p08YDa2buM563-emtoa8y89z0VXfvXA';

const authorities = { 'operatorI': 1, 'operatorII': 2, 'supervisor': 3, 'manager': 4, 'admin': 5 };

const positions = ['operatorI', 'operatorII', 'supervisor', 'manager', 'admin'];


// 部门
const workcells = [
  {
    "id": 1,
    "name": "公关部"
  },
  {
    "id": 0,
    "name": "事业部"
  }
];

const users = [
  {
    "workcell": workcells[0],
    "no": 1,
    "name": "商一帆",
    "pwd": "123456",
    "position": {
      "id": 1,
      "name": "operatorII"
    }
  },
  {
    "workcell": workcells[1],
    "no": 2,
    "name": "商一帆",
    "pwd": "123456",
    "position": {
      "id": 1,
      "name": "operatorI"
    }
  },
  {
    "workcell": workcells[0],
    "no": 3,
    "name": "商一帆",
    "pwd": "123456",
    "position": {
      "id": 1,
      "name": "manager"
    }
  },
  {
    "workcell": workcells[0],
    "no": 4,
    "name": "商一帆",
    "pwd": "123456",
    "position": {
      "id": 1,
      "name": "manager"
    }
  }, {
    "workcell": workcells[0],
    "no": 5,
    "name": "商一帆",
    "pwd": "123456",
    "position": {
      "id": 1,
      "name": "admin"
    }
  }, {
    "workcell": workcells[0],
    "no": 6,
    "name": "商一帆",
    "pwd": "123456",
    "position": {
      "id": 1,
      "name": "supervisor"
    }
  }, {
    "workcell": workcells[0],
    "no": 7,
    "name": "商一帆",
    "pwd": "123456",
    "position": {
      "id": 1,
      "name": "OperatorII"
    }
  }, {
    "workcell": workcells[0],
    "no": 8,
    "name": "商一帆",
    "pwd": "123456",
    "position": {
      "id": 1,
      "name": "OperatorII"
    }
  }, {
    "workcell": workcells[0],
    "no": 9,
    "name": "商一帆",
    "pwd": "123456",
    "position": {
      "id": 1,
      "name": "OperatorII"
    }
  }
]




function getWorkcells(req, res) {
  return res.json({
    status: "success",
    data: {
      workcells: workcells
    }
  })
}

function appendWorkcell(req, res) {
  const { name } = req.body;

  const newWorkcell = {
    id: workcells.length + 1,
    name: name
  }
  workcells.push(newWorkcell);
  return res.json({
    status: "success",
    data: {
      workcell: newWorkcell
    }
  })
}

function getUsers(req, res) {
  let { page, pageSize, workcell } = req.query;
  let allUsers = users;
  if (workcell) {
    allUsers = users.filter(user => user.workcell.id === +workcell);
  }
  const total = allUsers.length;
  let start = (page - 1) * pageSize;
  let end = Math.min(page * pageSize, total);

  return res.json({
    status: "success",
    data: {
      users: allUsers.slice(start, end),
      total: total
    }
  });
}

function appendUser(req, res) {
  const { workcell, no, pwd, name, position } = req.body;

  const theWc = workcells.find(wc => wc.id === +workcell);

  const theP = positions.find(p => p === position);

  const newUser = {
    "workcell": theWc,
    "no": no,
    "name": name,
    "pwd": pwd,
    "position": {
      name: theP,
      id: authorities[theP]
    }
  };

  users.push(newUser);

  return res.json({
    status: "success",
    data: {
      user: newUser
    }
  });
}

function patchUser(req, res) {
  const { no } = req.params;
  const { position } = req.body;
  const user = users.find(u => u.no === +no);

  if (user) {
    user.position.name = position;
  }
  return res.json({
    status: "success",
    data: {
      user: user
    }
  });
}

function deleteUser(req, res) {
  const { no } = req.params;

  const user = users.find(u => u.no === +no);
  return res.json({
    status: "success",
    data: {
      user: user
    }
  });
}

function change(req,res) {
  return res.json({
    status: "success",
  })
}


export default {
  // 'GET /api/workcells': getWorkcells,
  // 'GET /api/users': getUsers,
//   'POST /api/workcells': appendWorkcell,
//   'POST /api/users': appendUser,
//   'PATCH /api/users/:no': patchUser,
  // 'DELETE /api/users/:no': deleteUser,
  'PATCH /api/users': change,
  // 支持值为 Object 和 Array
  // 'GET /api/currentUser': {
  //   name: 'Serati Ma',
  //   avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  //   userid: '00000001',
  //   email: 'antdesign@alipay.com',
  //   signature: '海纳百川，有容乃大',
  //   title: '交互专家',
  //   group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
  //   tags: [
  //     {
  //       key: '0',
  //       label: '很有想法的',
  //     },
  //     {
  //       key: '1',
  //       label: '专注设计',
  //     },
  //     {
  //       key: '2',
  //       label: '辣~',
  //     },
  //     {
  //       key: '3',
  //       label: '大长腿',
  //     },
  //     {
  //       key: '4',
  //       label: '川妹子',
  //     },
  //     {
  //       key: '5',
  //       label: '海纳百川',
  //     },
  //   ],
  //   notifyCount: 12,
  //   unreadCount: 11,
  //   country: 'China',
  //   geographic: {
  //     province: {
  //       label: '浙江省',
  //       key: '330000',
  //     },
  //     city: {
  //       label: '杭州市',
  //       key: '330100',
  //     },
  //   },
  //   address: '西湖区工专路 77 号',
  //   phone: '0752-268888888',
  // },
  // GET POST 可省略
  // 'GET /api/users': [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //   },
  // ],
  // 'POST /api/users/login': (req, res) => {
  //   const { no, pwd } = req.body;

  //   // if (no === 'admin' && pwd === 'admin') {
  //   if (pwd === '123456' && no in authorities) {
  //     res.send({
  //       status: 'success',
  //       data: {
  //         user: {
  //           no: '12345678',
  //           name: 'sxy',
  //           email: '123@qq.com',
  //           phone: '13911112222',
  //           pwd: '123456',
  //           workcell: {
  //             id: 1,
  //           },
  //           position: {
  //             id: 1,
  //             name: no,
  //           },
  //         },
  //         token: adminToken,
  //       },
  //     });
  //     return;
  //   }
  //   if (pwd === 'ant.design' && no === 'user') {
  //     res.send({
  //       status: 'ok',
  //       // type,
  //       currentAuthority: 'user',
  //     });
  //     return;
  //   }

  //   res.send({
  //     status: 'error',
  //     // type,
  //     currentAuthority: 'guest',
  //   });
  // },

  // 'POST /api/users/currentUser': (req, res) => {
  //   const currentAuthority = req.headers.authorization;

  //   // 认证成功
  //   if (currentAuthority === 'Bearer ' + adminToken) {
  //     res.send({
  //       status: 'success',
  //       data: {
  //         user: {
  //           no: 'admin',
  //           name: 'sxy',
  //           email: '123@qq.com',
  //           phone: '13911112222',
  //           pwd: '123456',
  //           workcell: {
  //             id: 1,
  //             name: '事业部',
  //           },
  //           position: {
  //             id: 1,
  //             name: 'admin',
  //           },
  //         },
  //         token: adminToken,
  //       },
  //     });
  //   } else {
  //     // 认证失败，用户名、密码不匹配
  //     res.status(200).send({
  //       status: 'no user or number can not match password.',
  //       data: {
  //         token: '',
  //       },
  //     });
  //   }
  // },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
