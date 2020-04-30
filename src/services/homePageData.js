import request from './request';

export async function fakeChartData() {
  return request('/api/homePageData');
}
