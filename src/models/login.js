import { stringify } from 'querystring';
import { router } from 'umi';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority, setToken, setWorkcell } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {

      let response = yield call(fakeAccountLogin, payload);




      if (response.status === 'success') {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); // Login successfully


        const urlParams = new URL(window.location.href);

        const params = getPageQuery();

        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        redirect = "/";

        router.replace(redirect);
      } else {
        message.error("密码错误")
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      setAuthority('');
      setToken('');
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
        // router.replace('/user/login');
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {

      setWorkcell(payload.data.user.workcell.id);
      setAuthority(payload.data.user.position.name.slice(5));
      setToken(payload.data.token);

      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
