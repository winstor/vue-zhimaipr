import Layout from '@/layout'

const adminRouter = {
    path:'/admin',
    component: Layout,
    redirect: '/user/info',
    meta: {title: '选择项管理', icon: 'el-icon-s-custom',roles:['admin']},
    children:[
        {
            path: 'patent-type',
            meta: {title: '专利类型', icon: 'people'},
            component: () => import('@/views/admin/patent-type'),
        },{
            path: 'patent-status',
            meta: {title: '案件状态', icon: 'people'},
            component: () => import('@/views/admin/patent-status'),
        }
    ]
}


export default adminRouter