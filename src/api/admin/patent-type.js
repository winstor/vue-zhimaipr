import request from '@/utils/request'

const base_path = 'admin/patent-type'

export function fetchList(query) {
    return request({
        url: base_path,
        method: 'get',
        params: query
    })
}

export function fetchObject(id) {
    return request({
        url: base_path+`/${id}`,
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

export function updateObject(id,data) {
    return request({
        url: base_path+`/${id}`,
        method: 'put',
        data
    })
}

export function destroyObject(id) {
    return request({
        url: base_path+`/${id}`,
        method: 'delete',
    })
}

export function deleteObject(id) {
    return request({
        url: base_path+`/${id}`,
        method: 'delete',
    })
}
