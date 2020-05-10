import request from './request';
import { getToken } from '../utils/authority';

export async function downloadTemplate() {
    return request('/api/bills/download');
}


export async function uploadFiles(params) {

    return fetch('/api/bills/uploadExcel', {
        method: 'POST',
        body: params,
        headers: {
            Authorization: "Bearer " + getToken(),
        }
    });
}