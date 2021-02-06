import LayUiForm from './LayUi/Form'
import LayUiGrid from './LayUi/Grid'
import LayFilter from './LayUi/Grid/Filter'
import LayFilterItem from './LayUi/Grid/FilterItem'

import GridToolItem from './LayUi/Grid/ToolItem'
import ToolMore from './LayUi/Grid/ToolMore'
import LayTool from './LayUi/Grid/Tool'
import ToolCreate from './LayUi/Grid/Tool/ToolCreate'
import PatentShare from './LayUi/Grid/Tool/Batch/PatentShare'
import BatchMonitorButton from './LayUi/Grid/Tool/Batch/BatchMonitorButton'
import FriendShareButton from './LayUi/Grid/Tool/Batch/FriendShareButton'


import LayGridTable from './LayUi/Grid/Table'
import Pagination from '@/components/Pagination'
import LayGridMadel from './LayUi/Madel/GridMadel'
import GridNavTab  from './LayUi/Grid/GridNavTab'
import Selector  from './LayUi/Grid/Selector'

const components = {
    install(Vue) {
        Vue.component('ly-form', LayUiForm),
            Vue.component('ly-grid', LayUiGrid),
            Vue.component('ly-filter', LayFilter),
            Vue.component('ly-filter-item', LayFilterItem),
            Vue.component('ly-tool', LayTool),
            Vue.component('ly-tool-item', GridToolItem),
            Vue.component('ly-tool-more', ToolMore),
            Vue.component('ly-tool-create', ToolCreate),
            Vue.component('grid-patent-share', PatentShare),
            Vue.component('batch-monitor-button', BatchMonitorButton),
            Vue.component('batch-friend-share-button', FriendShareButton),

            Vue.component('ly-table', LayGridTable),
            Vue.component('ly-pagination', Pagination),
            Vue.component('ly-grid-nav-tabs', GridNavTab),
            Vue.component('ly-selector', Selector),
            Vue.component('grid-madel', LayGridMadel)
    }
}
//判断
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default components;