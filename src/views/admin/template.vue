<template>
		<div class="app-container">
				<div class="box-header">
						<div class="tool-container">
								<f-share-button v-model="multipleSelection" @onEnd="getList"></f-share-button>
								<create-button  @click="handleCreate()"></create-button>
								<batch-sale-button v-model="multipleSelection"  @onEnd="getList"></batch-sale-button>
								<el-button class="tool-group five-color" type="success" icon="el-icon-zoom-in" @click="">加入年费监控
								</el-button>
								<batch-more>
										<a @click="batchDelete()">批量删除</a>
								</batch-more>
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
										:is-drag="true"
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

    import GridTable from '@/components/Common/Grid/Table'
    import GridFilter from '@/components/Common/Grid/Filter'
    import Madel from '@/components/Common/Madel'
    import BatchMore from '@/components/Common/Tool/BatchMore'
    import FShareButton from '@/components/Common/Tool/FShareButton'
    import BatchSaleButton from '@/components/Common/Tool/BatchSaleButton'
    import CreateButton from '@/components/Common/Tool/CreateButton'

    import {fetchList, updateObject, createObject, deleteObject, batchOrderObject} from '@/api/request'

    const defaultRow = {name: ''}
    export default {
        name: "Index",
        directives: {waves},
        components: {GridTable, Pagination, Madel, GridFilter, FShareButton,BatchSaleButton,BatchMore,CreateButton},
        data() {
            return {
                base_path: '',
                //查询参数
                tableHeader: {name:{},created_at:{}},
                multipleSelection: [],
                toolData: ['create'],
                //操作
                actionsData: {},
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
                this.getList()
                console.log(this.listQuery)
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
            batchSale(){

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

</style>