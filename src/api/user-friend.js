import request from '@/utils/request'

const base_path = 'user-friend'

export function fetchList(query) {
    return request({
        url: base_path,
        method: 'get',
        params: query
    })
}

export function requestList() {
    return request({
        url: base_path+'/request',
        method: 'get',
    })
}

export function applyObject(query) {
    return request({
        url: base_path+'/apply',
        method: 'post',
        params: query
    })
}

export function respondObject(id,query) {
    return request({
        url: base_path+'/apply/respond'+`/${id}`,
        method: 'get',
        params: query
    })
}

export function updateObject(id,data) {
    return request({
        url: base_path+`/${id}`,
        method: 'put',
        data
    })
}

