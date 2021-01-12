import request from '@/utils/workflow-request'

export function getList() {
  return request({
    url: '/workflow-groups',
    method: 'get'
  })
}

export function getDetail(id) {
    return request({
        url: `/workflow-groups/${id}`,
        method: 'get'
    })
}

export function create(data) {
  return request({
    url: '/workflow-groups',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: `/workflow-groups/${id}`,
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: `/workflow-groups/${id}`,
    method: 'delete'
  })
}
