const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    routers: state => state.user.routers,
    permission_routes: state => state.permission.routes,
    errorLogs: state => state.errorLog.logs,
    patentType: state => state.options.patent_type,
    patentStatus: state => state.options.patent_status
}
export default getters
