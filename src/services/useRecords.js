import request from './request';


export async function queryUseRecords(params) {
  return request('/api/useRecords', {
    method: 'GET',
    params,
  });
}

export async function useOut(params) {
  return request('/api/useRecords', {
    method: 'POST',
    data: params,
  });
}

export async function useIn(params) {
  return request('/api/useRecords', {
    method: 'POST',
    data: params,
  });
}

export async function queryInfo(params) {
  return request(`/api/useRecords/${params.id}`)
}

// export async function firstCheck(params) {
//   return request(`/api/useRecords/${params.id}/firstCheck`, {
//     method: "PATCH",
//     data: {
//       status: params.status,
//     }
//   });
// }
// export async function secondCheck(params) {
//   return request(`/api/useRecords/${params.id}/secondCheck`, {
//     method: "PATCH",
//     data: {
//       status: params.status,
//     }
//   });
// }




// 未用到
export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
  });
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
