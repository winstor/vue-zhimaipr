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
				<ly-pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
				               @pagination="getList"/>
				<grid-madel v-model="row"
				            :title="madelData.title"
				            :visible.sync="dialogVisible"
				            @confirm="confirm">
						<el-form-item prop="patent_sn" label="专利号:">
								<el-input v-model="row.patent_sn" placeholder="专利号"/>
						</el-form-item>
						<el-form-item prop="patent_name" label="专利名称:">
								<el-input v-model="row.patent_name" placeholder="专利名称"/>
						</el-form-item>
						<el-form-item prop="patent_type_id" label="专利类型:">
								<el-select v-model="row.patent_type_id" placeholder="专利类型" clearable>
										<el-option v-for="option in patentTypeOptions" :key="option.id" :label="option.name"
										           :value="option.id"/>
								</el-select>
						</el-form-item>
						<el-form-item prop="patent_status_id" label="专利状态:">
								<el-select label="专利状态" v-model="row.patent_status_id">
										<el-option v-for="option in patentStatusOptions"
										           :key="option.id" :value="option.id"
										           :label="option.name">
										</el-option>
								</el-select>
						</el-form-item>
						<el-form-item prop="patent_person" label="申请人:">
								<el-input v-model="row.patent_person" placeholder="申请人"/>
						</el-form-item>
						<el-form-item prop="apply_date" label="申请日期:">
								<el-date-picker v-model="row.apply_date" format="yyyy-MM-dd" type="date" placeholder="申请日期"/>
						</el-form-item>
				</grid-madel>
		</ly-grid>
</template>

<script>
    import {deepClone} from '@/utils'
    import FilterItem from './components/FilterItem'
    import ToolItem from './components/ToolItem'
    import GridTable from './components/GridTable'

    import {mapState} from 'vuex'

    import {fetchList, updateObject, createObject, deleteObject, batchOrderObject} from '@/api/request'

    const defaultRow = {name: ''}
    export default {
        name: "Index",
        components: {FilterItem, ToolItem, GridTable},
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

<style lang="scss" scoped>

</style>