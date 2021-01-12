import request from '@/utils/workflow-request'

export function getNodeTempList(id) {
  return request({
    url: `/workflow-node/${id}`,
    method: 'get'
  })
}

export function saveNodeTemp(id,data) {
  return request({
    url: `/workflow-node/${id}`,
    method: 'post',
    data
  })
}

export function publishNode(id) {
  return request({
    url: `/workflow-node/publish/${id}`,
    method: 'put',
  })
}
