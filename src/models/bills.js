import { addFakeList, removeFakeList, updateFakeList, queryBills, addBill, queryInfo, firstCheck, secondCheck } from '../services/bills';
import { message } from 'antd';
import { router } from 'umi';


const Model = {
  namespace: 'bills',
  state: {
    list: [],
    total: 0,
    page: 1,
    pageSize: 5,
    status: 0,
    info: {
      subPerson: {},
      tDef: {},
      firstPerson: {},
      secondPerson: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const response = yield call(queryBills, payload);
      const status = yield select(state => state.status);
      yield put({
        type: 'setData',
        payload: {
          list: response.data.bills,
          total: response.data.total,
          page: payload.page || 1,
          status: payload.status || status,
        }
      });

      // yield put({
      //   type: 'queryList',
      //   payload: Array.isArray(response) ? response : [],
      // });
    },

    *appendBill({ payload }, { call }) {
      const response = yield call(addBill, payload);
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
          payload: response.data.info || {},
        });
      }
    },
    *firstCheck({ payload }, { call, put }) {
      const response = yield call(firstCheck, payload);
      if (response && response.status === 'success') {
        yield put({
          type: 'setInfo',
          payload: response.data.bill || {},
        });
        message.success("状态已更新")
      }
    },
    *secondCheck({ payload }, { call, put }) {
      const response = yield call(secondCheck, payload);
      if (response && response.status === 'success') {
        yield put({
          type: 'setInfo',
          payload: response.data.bill || {},
        });
        message.success("状态已更新")
      }
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }

      const response = yield call(callback, payload); // post

      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },
  reducers: {
    // queryList(state, action) {
    //   return { ...state, list: action.payload };
    // },
    setData(state, { payload: { list, total, page, status } }) {

      return { ...state, list, total, page, status }
    },
    setInfo(state, { payload }) {
      if (!payload.tDef) {
        payload.tDef = {};
      }
      if (!payload.subPerson) {
        payload.subPerson = {};
      }
      if (!payload.secondPerson) {
        payload.secondPerson = {};
      }
      if (!payload.firstPerson) {
        payload.firstPerson = {};
      }
      return { ...state, info: payload };
    },

    appendList(
      state = {
        list: [],
      },
      action,
    ) {
      return { ...state, list: state.list.concat(action.payload) };
    },
  },
};
export default Model;
