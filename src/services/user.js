import request from './request';
import { getToken } from '../utils/authority';



export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  console.log(`services queryCurrent`);

  console.log(getToken());
  return request('/api/currentUser', {
    method: 'POST',
    // headers: {
    //   'Authorization': "Bearer " + getToken(),
    // }
  });
}
export async function queryNotices() {
  return request('/api/notices');
}
