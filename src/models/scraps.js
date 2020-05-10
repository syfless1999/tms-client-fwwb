import { addFakeList, removeFakeList, updateFakeList, queryScraps, addScrap, queryInfo, firstCheck, secondCheck } from '../services/scraps';
import { message } from 'antd';
import { router } from 'umi';


const Model = {
  namespace: 'scraps',
  state: {
    // list: [],
    // total: 0,
    info: {
      subPerson: {
        position: {},
        workcell: {},
      },
      tool: {
        tDef: {},
        code:""
      },
      firstPerson: {
        position: {},
        workcell: {},
      },
      secondPerson: {
        position: {},
        workcell: {},
      },
      status: {
        name: ""
      },
    },
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const response = yield call(queryScraps, payload);
//      const status = yield select(state => state.status);
      yield put({
        type: 'setData',
        payload: {
          list: response.data.scraps.list,
          total: response.data.scraps.total,
        }
      });

      // yield put({
      //   type: 'queryList',
      //   payload: Array.isArray(response) ? response : [],
      // });
    },

    *appendScrap({ payload }, { call }) {
      const response = yield call(addScrap, payload);
      // yield put({
      //   type: 'appendList',
      //   payload: Array.isArray(response) ? response : [],
      // });
      //router.replace(`/scraps/${response.data.scrap.id}`)
      return response;
    },

    *fetchInfo({ payload }, { call, put }) {
      const response = yield call(queryInfo, payload);
//      console.log(response.data);
      if (response && response.status === 'success') {
        yield put({
          type: 'setInfo',
          payload: response.data.scrap || {}
        });
      }
    },
    *firstCheck({ payload }, { call, put }) {
      const response = yield call(firstCheck, payload);
      if (response && response.status === 'success') {
        yield put({
          type: 'setInfo',
          payload: response.data.scrap || {},
        });
        message.success("状态已更新")
      }
    },
    *secondCheck({ payload }, { call, put }) {
      const response = yield call(secondCheck, payload);
      if (response && response.status === 'success') {
        yield put({
          type: 'setInfo',
          payload: response.data.scrap || {},
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
//      console.log({ ...state, list, total })
      return { ...state, list, total }
    },
    setInfo(state, { payload }) {
      const info = { ...state.info, ...payload };
      return { info };
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
