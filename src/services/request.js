import req from '@/utils/request';
import { getToken } from '../utils/authority';


export default function request(url, payload) {

    if (payload.headers === undefined) payload.headers = {};
    payload.headers.Authorization = "Bearer " + getToken();
    if (!payload.headers['Content-Type']) {
        payload.headers['Content-Type'] = 'application/json';
    }
    return req(url, payload);
}