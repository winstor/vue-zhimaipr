import request from '@/utils/request'

export const base_path = 'patent-recycle'

export function fetchList(query) {
    return request({
        url: base_path,
        method: 'get',
        params: query,
    })
}

export function deleteObject(id) {
    return request({
        url: base_path + `/${id}`,
        method: 'delete',
    })
}
export function restoreObject(id) {
    return request({
        url: base_path + `/restore/${id}`,
        method: 'put',
    })
}

