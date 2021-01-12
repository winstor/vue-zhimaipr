import request from '@/utils/user-request'


export function getUserAllList() {
    return request({
        url: '/users/all',
        method: 'get',
    })
}

export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
