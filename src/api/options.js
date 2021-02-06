import request from '@/utils/request'

export function fetchOptionList() {
    return request({
        url: 'options',
        method: 'get',
    })
}

export function fetchPatentTypeList() {
    return request({
        url: 'options/patent_type',
        method: 'get',
    })
}

export function fetchPatentStatusList() {
    return request({
        url: 'options/patent_status',
        method: 'get',
    })
}