import Layout from '@/layout'

const transactionRouter = {
    path: '/transaction',
    component: Layout,
    meta: {title: '专利交易', icon: 'nested'},
    children: [
        {
            path: 'upload',
            meta: {title: '上传专利表格', icon: 'el-icon-upload', noCache: true},
            component: () => import('@/views/transaction/upload'),
        },
        {
            path: 'list',
            meta: {title: '我发布的专利', icon: 'el-icon-menu', noCache: true},
            component: () => import('@/views/transaction'),
        },
        // {
        //     path: 'sold',
        //     meta: {title: '已交易', noCache: true},
        // }
    ]
}


export default transactionRouter