<template>
		<div class="app-container">
				<div class="box-header">
						<div class="tool-container">
								<el-button class="tool-item" type="success" icon="el-icon-plus" @click="handleCreate">新增</el-button>
								<el-button class="tool-item red" type="success" icon="el-icon-plus" @click="batchDelete">批量删除
								</el-button>
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
										@drag-change="handleDrag"
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

    import GridTable from './components/Grid/DragTable'
    import GridFilter from './components/Grid/Filter'
    import Madel from './components/Madel'

    import {fetchList, updateObject, createObject, deleteObject, batchOrderObject} from '@/api/request'

    const defaultRow = {name: ''}
    export default {
        name: "Index",
        directives: {waves},
        components: {GridTable, Pagination, Madel, GridFilter},
        data() {
            return {
                base_path: '',
                //查询参数
                tableHeader: {},
                multipleSelection: [],
                //操作
                actionsData: {
                    label: '操作',
                    buttons: {
                        // edit: {label: '编辑', type: 'primary'},
                        // delete: {label: '删除', type: 'danger'},
                    }
                },
                list: [],
                total: 0,
                //列表更新参数
                listQuery: {
                    page: 1,
                    limit: 100,
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
                    console.log(this.tableHeader)
                    this.listLoading = false
                })
            },
            checkAction(val, type, callback) {
                const action = ['show', 'edit', 'delete']
                if (action.indexOf(type) === -1) {
                    return callback(false)
                }
                // if(type === 'show' && val.id > 0){
                //     return callback(false)
                // }
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
                this.getList()
                console.log(this.listQuery)
            },
            handleDrag(){
                batchOrderObject(this.base_path,this.list).then(res=>{
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
            batchDelete() {
                if (!this.multipleSelection.length) {
                    this.$message({
                        type: 'error',
                        message: '请选择要操作的行'
                    })
                    return
                }
                this.$confirm('确定删除吗?', '批量删除', {
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

            openEditDialog() {
                this.dialogType = 'edit'
                this.dialogVisible = true
                this.row = deepClone(scope.row)
            }
        },
    }
</script>

<style lang="scss" scoped>
		button.red {
				background-color: #E76950 !important;
				border-color: #E76950 !important;
		}

		button.red:hover {
				background-color: #c8414a !important;
				border-color: #c8414a !important;
		}
</style>