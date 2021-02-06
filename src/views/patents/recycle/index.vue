<template>
		<ly-grid>
				<filter-item v-model="listQuery.query_list" @search="handleFilter" @reset="handleFilterReset"/>
				<tool-item v-model="multipleSelection" @onEnd="getList"></tool-item>
				<grid-table
								v-model="list"
								@selection-change="handleSelectionChange"
								@sort-change="sortChange"
								@click-action="handleAction"
				/>
				<pagination
								v-show="total>0"
								:total="total"
								:page.sync="listQuery.page"
								:limit.sync="listQuery.limit"
								@pagination="getList"/>
		</ly-grid>
</template>

<script>
    import {deepClone} from '@/utils'
    import Pagination from '@/components/Pagination'
    import FilterItem from './components/FilterItem'
    import ToolItem from './components/ToolItem'
    import GridTable from './components/GridTable'

    import {mapState} from 'vuex'

    import {fetchList, updateObject, createObject, deleteObject, batchOrderObject} from '@/api/request'

    const defaultRow = {name: ''}
    export default {
        name: "Index",
        components: {Pagination, FilterItem, ToolItem, GridTable},
        data() {
            return {
                base_path: '',
                //查询参数
                tableHeader: {name: {}, created_at: {}},
                multipleSelection: [],
                toolData: ['create'],
                //操作
                actionsData: {},
                list: [],
                total: 0,
                //列表更新参数
                listQuery: {
                    page: 1,
                    limit: 20,
                    query_list: {},
                    sorter: '',
                },
                madelData: {
                    title: '新增',
                    filter: {
                        name: {label: '名称', default: ''},
                    },
                },
                row: Object.assign({}, defaultRow),
                dialogVisible: false,
                dialogType: 'create',
            }
        },
        computed: {
            ...mapState({
                patentTypeOptions: state => state.options.patent_type,
                patentStatusOptions: state => state.options.patent_status
            })
        },
        created() {
            this.base_path = this.$route.path
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true
                fetchList(this.base_path, this.listQuery).then(response => {
                    this.list = response.data.items
                    this.total = response.data.total
                    if (response.data.table_header) {
                        this.tableHeader = response.data.table_header
                    }
                    this.listLoading = false
                })
            },
            checkAction(val, type, callback) {
                const disable = ['show']
                if (disable.indexOf(type) > -1) {
                    return callback(false)
                }
                return callback(true)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
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
                    deleteObject(this.base_path, row.id).then(response => {
                        this.getList()
                        this.$message({message: '删除成功', type: 'success'})
                    })
                }).catch(err => {
                })
            },
            handleFilter() {
                this.listQuery.page = 1
                this.listQuery.sorter = ''
                this.getList()
            },
            handleFilterReset() {
                this.listQuery.query_list = {}
                this.handleFilter()
            },
            handleDrag() {
                batchOrderObject(this.base_path, this.list).then(res => {
                    this.getList()
                })
            },
            confirm() {
                const isEdit = this.dialogType === 'edit'
                if (isEdit) {
                    updateObject(this.base_path, this.row.id, this.row).then(response => {
                        this.getList()
                        this.$notify({
                            title: '保存成功',
                            dangerouslyUseHTMLString: true,
                            type: 'success'
                        })
                    })
                } else {
                    createObject(this.base_path, this.row).then(response => {
                        this.getList()
                        this.$notify({
                            title: '保存成功',
                            dangerouslyUseHTMLString: true,
                            type: 'success'
                        })
                    })
                }
                this.dialogVisible = false
            },
            batchDelete(title) {
                if (!this.multipleSelection.length) {
                    this.$message({
                        type: 'error',
                        message: '请选择要操作的行'
                    })
                    return
                }
                this.$confirm('确定' + title + '吗?', title, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let ids = []
                    this.multipleSelection.forEach(function (item) {
                        ids.push(item.id)
                    })
                    deleteObject(this.base_path, ids.join(',')).then(response => {
                        this.getList()
                        this.$notify({
                            title: '操作成功',
                            dangerouslyUseHTMLString: true,
                            type: 'success'
                        })
                    })
                }).catch(err => {
                })
            },
            batchSale() {

            },
            openEditDialog() {
                this.dialogType = 'edit'
                this.dialogVisible = true
                this.row = deepClone(scope.row)
            }
        },
    }
</script>

<style scoped>

</style>