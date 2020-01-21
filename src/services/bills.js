import request from './request';
export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
  });
}

export async function queryBills(params) {
  return request('/api/bills', {
    params,
  });
}

export async function addBill(params) {
  return request('/api/bills', {
    method: 'POST',
    data: params,
  });
}

export async function queryInfo(params) {
  return request(`/api/bills/${params.id}`)
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'delete' },
  });
}
export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'post' },
  });
}
export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'update' },
  });
}
