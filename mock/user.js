function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

const adminToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzkxNDU1NDgsImV4cCI6MTU3OTE0OTE0OCwiYXVkIjoiMTIzMDkzNiIsInBvc3Rpb24iOiJzdXBlcnZpc29yIiwicGFzc3dvcmQiOiIxMjM0NTYifQ.H1VFIy6531u6p08YDa2buM563-emtoa8y89z0VXfvXA';
export default {
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
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login': (req, res) => {
    const { no, pwd } = req.body;

    if (no === 'admin' && pwd === 'admin') {
      res.send({
        status: 'success',
        data: {
          user: {
            no: '12345678',
            name: 'sxy',
            email: '123@qq.com',
            phone: '13911112222',
            pwd: '12345678',
            workcell: {
              id: 1,
            },
            position: {
              id: 1,
              name: 'admin',
            },
          },
          token: adminToken,
        },
      });
      return;
    }
    if (password === 'ant.design' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },

  'POST /api/currentUser': (req, res) => {
    const currentAuthority = req.headers.authorization;

    if (currentAuthority === 'Bearer ' + adminToken) {
      res.send({
        status: 'success',
        data: {
          user: {
            no: 'admin',
            name: 'sxy',
            email: '123@qq.com',
            phone: '13911112222',
            pwd: '12345678',
            workcell: {
              id: 1,
              name: '事业部',
            },
            position: {
              id: 1,
              name: 'admin',
            },
          },
          token: adminToken,
        },
      });
    } else {
      res.status(401).send({
        status: 'no user or number can not match password.',
        data: {},
      });
    }
  },
  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
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
