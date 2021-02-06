import request from '@/utils/request'

export function getWorkflowRouters() {
    return request({
        url: '/workflow-routers',
        method: 'get'
    })
}