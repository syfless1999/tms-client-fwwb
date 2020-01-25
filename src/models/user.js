import { queryCurrent, query as queryUsers, fetchUsers, fetchWorkcells, addUser, addWorkcell, deleteUser, updateAuthority } from '@/services/user';
import { setToken } from '@/utils/authority';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    users: [],
    total: 0,
    page: 1,
    pageSize: 5,
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      if (response.status === 'success') {
        setToken(response.data.token);
        yield put({
          type: 'saveCurrentUser',
          payload: response,
        });
      }
    },
    *fetchUsers({ payload }, { call, put }) {
      const response = yield call(fetchUsers, payload);
      if (response && response.status === 'success') {
        yield put({
          type: 'saveUsers',
          payload: {
            users: response.data.users,
            total: response.data.total,
            page: payload.page || 1,
          }
        });
      }
    },
    *addUser({ payload }, { call, put }) {
      const res = yield call(addUser, payload);
      return res;
    },
    *deleteUser({ payload }, { call }) {
      return yield call(deleteUser, payload);
    },
    *updateAuthority({ payload }, { call }) {
      return yield call(updateAuthority, payload);
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload.data.user || {} };
    },
    saveUsers(state, { payload }) {
      return { ...state, ...payload };
    },
    removeCurrentUser(state) {
      return { ...state, currentUser: {} };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
