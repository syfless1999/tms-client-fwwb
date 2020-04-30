import request from './request';
export async function fakeAccountLogin(params) {
  return fetch('/api/users/login', {
    method:'post',
    body: params,
  })
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
