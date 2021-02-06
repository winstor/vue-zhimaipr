/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
    path:'/user',
    component: Layout,
    redirect: '/user/info',
    meta: {title: '用户中心', icon: 'el-icon-s-custom'},
    children:[
        {
            path: 'info',
            meta: {title: '个人信息', icon: 'people'},
            component: () => import('@/views/user/info'),
        },{
            path: 'address',
            meta: {title: '联系地址', icon: 'el-icon-location-outline'},
            component: () => import('@/views/user/address'),
            children:[

            ]
        },{
            path: 'changePassword',
            meta: {title: '修改密码', icon: 'password'},
            component: () => import('@/views/user/password'),
        },{
            path: 'friendList',
            meta: {title: '好友列表', icon: 'peoples'},
            component: () => import('@/views/user/friend/index'),
        },{
            path: 'friendRequest',
            meta: {title: '好友请求', icon: 'email', role: ['admin1']},
            component: () => import('@/views/user/friend/request'),
        },
    ],
}

export default userRouter
