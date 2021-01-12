import request from '@/utils/workflow-request'

export function getApplyList(id) {
    return request({
        url: `/workflow-apply/${id}`,
        method: 'get'
    })
}

export function getDetail(id) {
    return request({
        url: `/workflow/${id}`,
        method: 'get'
    })
}

export function createWorkflowApply(id,data) {
    return request({
        url: `/workflow-apply/${id}`,
        method: 'post',
        data
    })
}

export function update(id, data) {
    return request({
        url: `/workflow/${id}`,
        method: 'put',
        data
    })
}

export function destroy(id) {
    return request({
        url: `/workflow/${id}`,
        method: 'delete'
    })
}
