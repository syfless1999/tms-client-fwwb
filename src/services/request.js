import req from '@/utils/request';
import { getToken } from '../utils/authority';


export default function request(url, payload) {
  payload = payload || {};
  if (payload.headers === undefined) payload.headers = {};
  payload.headers.Authorization = "Bearer " + getToken();
  return req(url, payload);
}