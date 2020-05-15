import request from './request';


export async function queryFamilies(){
    return request('/api/families');
}