import request from './request';
import { getToken, getWorkcell } from '../utils/authority';



export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/users/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}




export async function fetchWorkcells() {
  return request('/api/workcells');
}

export async function addWorkcell(params) {

  return request('/api/workcells', {
    method: 'POST',
    data: params
  });
}

export async function fetchUsers(params) {
  return request('/api/users', {
    params: {
      ...params,
      workcell: getWorkcell()
    }
  });
}

export async function addUser(params) {
  return request('/api/users', {
    method: 'POST',
    data: params
  });
}

export async function updateAuthority(params) {

  return request(`/api/users/${params.no}`, {
    method: 'PATCH',
    data: {
      position: params.position
    }
  })
}

export async function deleteUser(params) {
  return request(`/api/users/${params.id}`, {
    method: 'DELETE'
  });
}

export async function changePwd(params) {
  return request('/api/users', {
    method: 'PATCH',
    data: params
  });
}

export async function changeEmail(params) {
  return request('/api/users', {
    method: 'PATCH',
    data: params
  });
}