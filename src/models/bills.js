import { addFakeList, removeFakeList, updateFakeList, queryBills, addBill } from '../services/bills';

const Model = {
  namespace: 'bills',
  state: {
    list: [],
    total: 0,
    page: 1,
    pageSize: 5,
    status: 0
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      console.log(payload);
      // const response = yield call(queryFakeList, payload);
      const response = yield call(queryBills, payload);
      console.log(response);
      const status = yield select(state => state.status);
      yield put({
        type: 'setData',
        payload: {
          list: response.data.bills,
          total: response.data.total,
          page: payload.page || 1,
          page: payload.status || status,
        }
      });

      // yield put({
      //   type: 'queryList',
      //   payload: Array.isArray(response) ? response : [],
      // });
    },

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(addBill, payload);
      // yield put({
      //   type: 'appendList',
      //   payload: Array.isArray(response) ? response : [],
      // });
      if (response.status === "success") {
        router.replace(`/bills/${response.data.bill.id}`)
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
