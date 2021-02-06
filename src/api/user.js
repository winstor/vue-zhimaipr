import request from '@/utils/request'


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

export function getInfo() {
    return request({
        url: '/user/info',
        method: 'get',
    })
}

export function fetchUser() {
    return request({
        url: '/user/show',
        method: 'get',
    })
}
export function updateUser(data) {
    return request({
        url: '/user',
        method: 'put',
        data
    })
}

export function changePassword(data) {
    return request({
        url: '/user/changePassword',
        method: 'put',
        data
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}

export function fetchUserAddress() {
    return request({
        url: '/user/address',
        method: 'get',
    })
}

export function createUserAddress(data) {
    return request({
        url: '/user/address',
        method: 'post',
        data
    })
}

export function updateUserAddress(data) {
    return request({
        url: '/user/address',
        method: 'put',
        data
    })
}
