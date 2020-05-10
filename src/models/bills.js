import { addFakeList, removeFakeList, updateFakeList, queryBills, addBill, queryInfo, firstCheck, secondCheck } from '../services/bills';
import { message } from 'antd';



const Model = {
  namespace: 'bills',
  state: {
    list: [],
    total: 0,
    info: {
      submitPerson: {},
      status: {},
      tDef: {},
      firstPerson: {},
      secondPerson: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const response = yield call(queryBills, payload);
      yield put({
        type: 'setData',
        payload: {
          list: response.data.bills.list,
          total: response.data.bills.total,
        }
      });
    },

    *appendBill({ payload }, { call }) {
      const response = yield call(addBill, payload);
      return response;
    },

    *fetchInfo({ payload }, { call, put }) {
      const response = yield call(queryInfo, payload);
      if (response && response.status === 'success') {
        yield put({
          type: 'setInfo',
          payload: response.data.bill || {},
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
    setData(state, { payload: { list, total } }) {

      return { ...state, list, total }
    },
    setInfo(state, { payload }) {
      const info = { ...state.info, ...payload };
      console.log({ ...state, info });
      return { ...state, info };
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
