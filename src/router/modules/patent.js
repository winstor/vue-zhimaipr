import Layout from '@/layout'

const patentRouter = {
    path:'/patents',
    component: Layout,
    meta: {title: '专利管理', icon: 'nested'},
    children: [
        {
            path: '',
            meta: {title: '我的专利', icon: 'el-icon-menu', noCache: true},
            component: () => import('@/views/patents'),
        },
        {
            path: '/patents/addPatent',
            component: () => import('@/views/patents/add'),
            meta: {title: '添加专利', icon: 'el-icon-circle-plus-outline'},
            redirect: '/patents/addPatent/cpc',
            children: [
                {
                    path: '/patents/cpc',
                    meta: {title: '上传CPC官文'},
                    component: () => import('@/views/patents/add/cpc'),
                },
                {
                    path: '/patents/excel',
                    meta: {title: '上传专利表格', noCache: true},
                    component: () => import('@/views/patents/add/excel'),
                },
                {
                    path: '/patents/create',
                    meta: {title: '输入专利添加', noCache: true},
                    component: () => import('@/views/patents/add/form'),
                },
                {
                    path: 'notice',
                    meta: {title: '上传交局文件', noCache: true},
                    component: () => import('@/views/patents/add/notice'),
                }
            ]
        },
        {
            path: 'notice',
            meta: {title: '专利通知书', icon: 'el-icon-notebook-2', noCache: true},
            component: () => import('@/views/patents/create'),
        },
        {
            path: '/patent-monitor',
            meta: {title: '年费监控', icon: 'el-icon-zoom-in', noCache: true},
            component: () => import('@/views/patents/monitor'),
        },
        // {
        //     path: 'transaction',
        //     meta: {title: '专利交易', icon: 'shopping'},
        //     children:[
        //         {
        //             path: 'upload',
        //             meta: {title: '上传专利表格', noCache: true},
        //         },{
        //             path: '/transaction',
        //             meta: {title: '我发布的专利', noCache: true},
        //             component: () => import('@/views/patents/transaction'),
        //         },
        //         {
        //             path: 'reserveList',
        //             meta: {title: '我的预订', noCache: true},
        //         },
        //         {
        //             path: 'sold',
        //             meta: {title: '已交易', noCache: true},
        //         },
        //     ]
        // },
        {
            path: '/patent-recycle',
            meta: {title: '专利回收站', icon: 'el-icon-delete', noCache: true},
            component: () => import('@/views/patents/recycle'),
        }
    ]
}


export default patentRouter