import request from '@/utils/workflow-request'

export function getWorkflowRouters() {
    return request({
        url: '/workflow-routers',
        method: 'get'
    })
}