<template>
		<div class="app-container">
				<div class="box-header">
						<ly-filter v-model="listQuery" :data="filterData" @search="handleFilter"></ly-filter>
						<div class="tool-container">
								<el-button class="tool-item" type="success" icon="el-icon-plus" @click="handleCreate">新增</el-button>
								<el-button v-waves type="primary" icon="el-icon-download" @click="">导出</el-button>
						</div>
				</div>
				<div class="box-body">
						<grid-table
										v-model="list"
										:visible-columns="tableHeader"
										:action-data="actionsData"
										@selection-change="handleSelectionChange"
										@sort-change="sortChange"
										@check-action="checkAction"
										@click-action="handleAction"
						/>
				</div>
				<div class="box-footer">
						<pagination
										v-show="total>0"
										:total="total"
										:page.sync="listQuery.page"
										:limit.sync="listQuery.limit"
										@pagination="getList"
						/>
				</div>
				<madel
								v-model="row"
								:filter="madelData.filter"
								:title="madelData.title"
								:visible.sync="dialogVisible"
								@confirm="confirm"
				></madel>
		</div>
</template>

<script>
    import {deepClone} from '@/utils'
    import Pagination from '@/components/Pagination'
    import waves from '@/directive/waves'

    import GridTable from '@/components/Template/Grid/Table'
    import GridFilter from '@/components/Template/Grid/Filter'
    import Madel from '@/components/Template/Madel'

    //import openWindow from '@/utils/open-window'
    import {fetchList} from '@/api/user-address'

    const defaultRow = {title: '', name: '', mobile: ''}
    export default {
        name: "Index",
        directives: {waves},
        components: {GridTable, Pagination, Madel, GridFilter},
        data() {
            return {
                //查询参数
                filterData: {
                    name: {label: '姓名', type: 'text'},
                    time: {label: '时间', type: 'date'},
                    patent_type: {
                        label: '专利类型',
                        type: 'select',
                        options: [
                            {value: 1, text: '发明专利'},
                            {value: 2, text: '实用新型'},
                            {value: 3, text: '外观设计'}
                        ],
                    }
                },
                tableHeader: {name: {label: '姓名'}, mobile: {}, address: {}},
                multipleSelection: [],
                //操作
                actionsData:{
                    label:'操作',
                    buttons:{
                        show:{label: '查看', type: 'success'},
                        edit:{label: '编辑', type: 'primary'},
                        delete:{label: '删除', type: 'danger'},
                    }
                },
                madelData:{
                    title:'添加',
                    filter:{
                        name:  {label:'标题',default:''},
                        mobile:{label:'电话',default:''},
                    },
                },
                list: [],
                total: 0,
                //列表更新参数
                listQuery: {
                    page: 1,
                    limit: 20,
                    name: '',
                    time: '',
                    patent_type: '',
                    sort: '',
                },
                row: Object.assign({}, defaultRow),
                dialogVisible: false,
                dialogType: 'create',
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true
                fetchList(this.listQuery).then(response => {
                    this.list = response.data.items
                    this.total = response.data.total
                    this.listLoading = false
                })
            },
            destroy(id) {
                console.log("destroy")
                // destroyObject(row.id).then(response => {
                //     this.lists.splice($index, 1)
                //     this.$message({
                //         type: 'success',
                //         message: '删除成功'
                //     })
                // })
            },
            checkAction(val,type,callback){
                const action = ['show','edit','delete']
                if(action.indexOf(type) === -1){
                    return callback(false)
                }
                // if(type === 'show' && val.id > 0){
                //     return callback(false)
                // }
                return callback(true)
            },
            handleSelectionChange(val){
                console.log(val)
            },
            sortChange(sort, order) {
                console.log(sort, order, 'sortChange')
            },
            handleAction(scope, type) {
                if (type === 'show') {

                } else if (type === 'edit') {
                    this.handleEdit(scope)
                } else if (type === 'delete') {
                    this.handleDelete(scope)
                } else {

                }
            },
            handleCreate() {
                this.dialogType = 'create'
                this.madelData.title = '新增'
                this.dialogVisible = true
                this.row = Object.assign({}, defaultRow)
            },
            handleEdit(scope) {
                this.dialogType = 'edit'
                this.dialogVisible = true
                this.madelData.title = '编辑'
                this.row = deepClone(scope.row)
            },
            handleDelete({$index, row}) {
                this.$confirm('确定删除吗?', 'Warning', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {

                }).catch(err => {})
            },
            handleFilter() {
                this.listQuery.page = 1
                this.getList()
                console.log(this.listQuery)
            },
            confirm() {

            },
            openEditDialog() {
                this.dialogType = 'edit'
                this.dialogVisible = true
                this.row = deepClone(scope.row)
            },
		        getOptions(){
                fetchList(this.listQuery).then(response => {
                    this.list = response.data.items
                    this.total = response.data.total
                    this.listLoading = false
                })
		        }
        },
    }
</script>

<style lang="scss" scoped>

</style>