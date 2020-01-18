import { stringify } from 'querystring';
import { router } from 'umi';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      console.log('-1');
      console.log(window.location.href);

      const response = yield call(fakeAccountLogin, payload);

      console.log(response);

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.status === 'success') {
        console.log('window href');
        console.log(window.location.href);

        const urlParams = new URL(window.location.href);
        console.log(`urlParams`);
        console.log(urlParams);

        const params = getPageQuery();
        console.log('params');
        console.log(params);

        let { redirect } = params;
        console.log('1');

        console.log(redirect);
        console.log(urlParams);

        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          console.log('2');
          console.log(redirect);
          console.log(urlParams);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            console.log('3');
            console.log(redirect);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
              console.log('4');
              console.log(redirect);
            }
          } else {
            window.location.href = '/';
            console.log('5');
            console.log(redirect);
            return;
          }
        }
        console.log('6');
        console.log(redirect);
        // redirect = "/welcome"
        router.replace(redirect || '/');
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    logout() {
      console.log(window.location.pathname);
      console.log('window.location');

      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      localStorage.setItem('accessToken', '');
      setAuthority('');
      console.log(window.location.pathname);
      console.log(`redirect${redirect}`);

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
      // setAuthority(payload.currentAuthority);
      setAuthority(payload.data.user.position.name);
      // localStorage存储accessToken和authority
      localStorage.setItem('accessToken', payload.data.token);
      // localStorage.setItem("antd-pro-authority", payload.data.user.position.name);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
