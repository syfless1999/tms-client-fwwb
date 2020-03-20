import { queryRepairs, queryInfo, addRepair, checkRepair } from '../services/repairs';
import { message } from 'antd';
import { router } from 'umi';


const Model = {
  namespace: 'repairs',
  state: {
    list: [],
    total: 0,
    page: 1,
    pageSize: 16,
    status: 0,
    info: {
      toolId: "",
      description: "",
      image: null,
      subTime: null,
      tDef:{

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
      const status = yield select(state => state.status);
      const page = yield select(state => state.page);

      yield put({
        type: 'setData',
        payload: {
          list: response.data.repairApps,
          total: response.data.total,
          page: payload.page || page,
          status: payload.status || status,
        }
      });
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
          payload: response.data.repairApp || {},
        });
        message.success("状态已更新")
      }
    },
  },
  reducers: {
    setData(state, { payload: { list, total, page, status } }) {

      return { ...state, list, total, page, status }
    },
    setInfo(state, { payload }) {
      return { ...state, info: payload };
    },
  },
};
export default Model;
