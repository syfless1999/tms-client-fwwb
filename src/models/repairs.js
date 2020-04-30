import { queryRepairs, queryInfo, addRepair, checkRepair } from '../services/repairs';
import { message } from 'antd';


const Model = {
  namespace: 'repairs',
  state: {
    list: [],
    total: 0,
    info: {
      toolId: "",
      description: "",
      image: null,
      subTime: null,
      tool: {
        tDef: {},
        status: {},
      },
      subPerson: {
        name: '',
        id: '',
      },
      checkPerson: {
        name: '',
        id: '',
      }
    },
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const response = yield call(queryRepairs, payload);

      if (response.status === "success") {
        yield put({
          type: 'setData',
          payload: {
            list: response.data.repairApps.list,
            total: response.data.repairApps.total,
          }
        });
      } else {
        message.error(response.message);
      }

    },

    *appendRepair({ payload }, { call }) {
      const response = yield call(addRepair, payload);
      // yield put({
      //   type: 'appendList',
      //   payload: Array.isArray(response) ? response : [],
      // });
      //router.replace(`/bills/${response.data.bill.id}`)
      return response;
    },

    *fetchInfo({ payload }, { call, put }) {
      const response = yield call(queryInfo, payload);
      if (response && response.status === 'success') {
        yield put({
          type: 'setInfo',
          payload: response.data.repairApp || {},
        });
      }
    },
    *checkRepair({ payload }, { call, put }) {
      const response = yield call(checkRepair, payload);
      if (response && response.status === 'success') {
        yield put({
          type: 'setInfo',
          payload: response.data.repairApp,
        });
        message.success("状态已更新")
      }
    },
  },
  reducers: {
    setData(state, { payload: { list, total } }) {

      return { ...state, list, total }
    },
    setInfo(state, { payload }) {
      return { ...state, info: payload };
    },
  },
};
export default Model;
