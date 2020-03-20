import request from './request';


export async function queryRepairs(params) {
  return request('/api/repairApps', {
    params,
  });
}

export async function addRepair(params) {
  return request('/api/repairApps', {
    method: 'POST',
    data: params,
  });
}

export async function queryInfo(params) {
  return request(`/api/repairApps/${params.id}`)
}

export async function checkRepair(params) {
  return request(`/api/repairApps/${params.id}`, {
    method: "PATCH",
    data: {
      checkTime: params.checkTime,
    }
  });
}


