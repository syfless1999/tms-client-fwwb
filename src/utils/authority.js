import { reloadAuthorized } from './Authorized';
// use localStorage to store the authority info, which might be sent from server in actual project.

export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('antd-pro-authority') : str; // authorityString could be admin, "admin", ["admin"]

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  } // preview.pro.ant.design only do not use in your production.
  // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }
  return authority;
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority)); // auto reload
  reloadAuthorized();
}


/**
 * 权限比较，返回正数表示当前权限大于所需权限
 * @param {string}} compareAuthority 需要被对比的权限
 */
export function compareAuthority(compareAuthority) {
  const nowA = getAuthority()[0];
  const dic = {
    "": 0,
    "operatorI": 1,
    "operatorII": 2,
    "supervisor": 3,
    "manager": 4,
    "admin": 5
  }

  return dic[nowA] - dic[compareAuthority];
}
/**
 * 获取token
 */
const getToken = () => {
  if (localStorage.getItem('accessToken') && localStorage.getItem('accessToken') !== "") {
    return localStorage.getItem('accessToken');
  } else {
    setToken("");
    return localStorage.getItem('accessToken');
  }
}

/**
 * 更改token
 */
const setToken = (token) => {
  localStorage.setItem('accessToken', token);
}


/**
 * 更新workcell
 */
const setWorkcell = id => {
  localStorage.setItem('workcellId', id);
}


const getWorkcell = _ => {
  return localStorage.getItem('workcellId');
}
export { getToken, setToken, setWorkcell, getWorkcell };