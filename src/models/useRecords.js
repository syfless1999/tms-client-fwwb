import { addFakeList, removeFakeList, updateFakeList, queryUseRecords, useOut, useIn ,queryInfo, queryUseRecordsOut } from '../services/useRecords';
import { message } from 'antd';
import { router } from 'umi';
import { ConsoleSqlOutlined } from '@ant-design/icons';


const Model = {
  namespace: 'useRecords',
  state: {
    list: [],
    total: 0,
    useRecords: {
      status: {},
      staff: {},
      tool: {
        tDef: {},
      },
      recorder: {
        position: {},
        workcell: {},
      },
      productLine: {
        workcell: {},
      },
      location: {
        workcell: {},
      },
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUseRecords, payload);
      yield put({
        type: 'setData',
        payload: {
          list: response.data.useRecords.list,
          total: response.data.useRecords.total,
        }
      });
    },

    *fetchOut({ payload }, { call, put }) {
      const response = yield call(queryUseRecordsOut, payload);
      yield put({
        type: 'setData',
        payload: {
          list: response.data.useRecords.list,
          total: response.data.useRecords.total,
        }
      });
    },

    *useOut({ payload }, { call }) {
      const response = yield call(useOut, payload);
      return response;
    },

    *useIn({ payload }, { call }) {
      const response = yield call(useIn, payload);
      return response;
    },

    *fetchInfo({ payload }, { call, put }) {
      const response = yield call(queryInfo, payload);
      if (response && response.status === 'success') {
        yield put({
          type: 'setInfo',
          payload: {
            useRecords : response.data.useRecord
          }
        });
      }
    },
    // *firstCheck({ payload }, { call, put }) {
    //   const response = yield call(firstCheck, payload);
    //   if (response && response.status === 'success') {
    //     yield put({
    //       type: 'setInfo',
    //       payload: response.data.useRecords || {},
    //     });
    //     message.success("状态已更新")
    //   }
    // },
    // *secondCheck({ payload }, { call, put }) {
    //   const response = yield call(secondCheck, payload);
    //   if (response && response.status === 'success') {
    //     yield put({
    //       type: 'setInfo',
    //       payload: response.data.useRecords || {},
    //     });
    //     message.success("状态已更新")
    //   }
    // },
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
    setData(state, { payload: { list, total} }) {
      return { ...state, list, total}
    },
    setInfo(state, { payload: { useRecords } }) {
      return { ...state, useRecords };
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
