import request from '@/utils/request'

export const base_path = 'patents'

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

export function batchSellObject(id, sell_status) {
    return request({
        url: base_path + `/batch-sell/${id}`,
        method: 'put',
        params: {sell_status: sell_status},
    })
}

export function batchMonitorObject(id, is_monitor) {
    return request({
        url: base_path + `/batch-monitor/${id}`,
        method: 'put',
        params: {is_monitor: is_monitor},
    })
}

export function batchShareObject(id, user_ids) {
    return request({
        url: base_path + `/batch-share/${id}`,
        method: 'put',
        params: {friends: user_ids},
    })
}
