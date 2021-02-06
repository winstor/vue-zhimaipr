import request from '@/utils/request'

export function fetchList(base_path, query) {
    return request({
        url: base_path,
        method: 'get',
        params: query,
    })
}

export function fetchObject(base_path, id) {
    return request({
        url: base_path + `/${id}`,
        method: 'get',
    })
}


export function createObject(base_path, data) {
    return request({
        url: base_path,
        method: 'post',
        data
    })
}

export function updateObject(base_path, id, data) {
    return request({
        url: base_path + `/${id}`,
        method: 'put',
        data
    })
}

export function deleteObject(base_path, id) {
    return request({
        url: base_path + `/${id}`,
        method: 'delete',
    })
}

export function batchOrderObject(base_path, data) {
    return request({
        url: base_path+'/batch-order',
        method: 'put',
        data,
    })
}

