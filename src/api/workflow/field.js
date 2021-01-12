import request from '@/utils/workflow-request'

export function getFieldTypeList() {
    return request({
        url: '/field-type',
        method: 'get'
    })
}


export function getWorkflowFieldList(id) {
  return request({
    url: `/workflow-field/${id}`,
    method: 'get'
  })
}

export function saveWorkflowField(id,data) {
  return request({
      url: `/workflow-field/${id}`,
    method: 'post',
    data
  })
}

export function publishWorkflowField(id) {
  return request({
    url: `/workflow-field/publish/${id}`,
    method: 'put',
  })
}
