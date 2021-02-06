import request from '@/utils/request'

export const base_path = 'patent-goods'

export function fetchList(query) {
    return request({
        url: base_path,
        method: 'get',
        params: query,
    })
}

export function fetchObject(id) {
    return request({
        url: base_path + `/${id}`,
        method: 'get',
    })
}


export function createObject(data) {
    return request({
        url: base_path,
        method: 'post',
        data
    })
}

export function updateObject(id, data) {
    return request({
        url: base_path + `/${id}`,
        method: 'put',
        data
    })
}

export function deleteObject(id) {
    return request({
        url: base_path + `/${id}`,
        method: 'delete',
    })
}