import request from './request';
import { getToken } from '../utils/authority';



export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {

  return request('/api/users/currentUser', {
    method: 'POST',
    // headers: {
    //   'Authorization': "Bearer " + getToken(),
    // }
  });
}
export async function queryNotices() {
  return request('/api/notices');
}




export async function fetchWorkcells() {
  return request('/api/workcells');
}

export async function addWorkcell(params) {
  console.log(params);
  
  return request('/api/workcells', {
    method: 'POST',
    data: params
  });
}

export async function fetchUsers(params) {
  return request('/api/users', {
    params
  });
}

export async function addUser(params) {
  return request('/api/users', {
    method: 'POST',
    data: params
  });
}

export async function updateAuthority(params) {
  console.log(params);
  
  return request(`/api/users/${params.no}`, {
    method: 'PATCH',
    data: {
      position: params.position
    }
  })
}

export async function deleteUser(params) {
  return request(`/api/users/${params.no}`, {
    method: 'DELETE'
  });
}

export async function changePwd(params) {
  return request('/api/users', {
    method: 'PATCH',
    data: params
  });
}