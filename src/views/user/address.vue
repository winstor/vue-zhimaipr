<template>
		<div class="app-container">
				<div class="box-header">
						<div class="tool-container">
								<el-button class="tool-item" type="success" icon="el-icon-plus" @click="handleAdd">新增</el-button>
						</div>
				</div>
				<el-table v-loading="listLoading" :data="lists" :key="tableKey"  style="width: 100%;margin-top:30px;" border>
						<el-table-column align="center" label="ID" width="220">
								<template slot-scope="scope">
										{{ scope.$index + 1 }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="联系人">
								<template slot-scope="scope">
										{{ scope.row.name }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="详细地址">
								<template slot-scope="scope">
										{{ scope.row.address }}
										<el-tag v-if="scope.row.default">默认地址</el-tag>
								</template>
						</el-table-column>
						<el-table-column align="center" label="联系电话">
								<template slot-scope="scope">
										{{ scope.row.mobile }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="操作" width="300">
								<template slot-scope="scope">
										<el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
										<el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
								</template>
						</el-table-column>
				</el-table>

				<el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑':'新增'">
						<el-form :model="row" label-width="80px" label-position="left">
								<el-form-item label="联系人">
										<el-input v-model="row.name" placeholder="联系人"/>
								</el-form-item>
								<el-form-item label="联系电话">
										<el-input v-model="row.mobile" placeholder="联系电话"/>
								</el-form-item>
								<el-form-item label="详细地址">
										<el-input v-model="row.address" placeholder="详细地址"/>
								</el-form-item>
								<el-form-item v-if="lists" label="默认地址">
										<el-radio-group v-model="row.default">
												<el-radio :label="false">否</el-radio>
												<el-radio :label="true">是</el-radio>
										</el-radio-group>
								</el-form-item>
						</el-form>
						<div style="text-align:right;">
								<el-button type="danger" @click="dialogVisible=false">取消</el-button>
								<el-button type="primary" @click="confirm">确定</el-button>
						</div>
				</el-dialog>
		</div>
</template>

<script>
    import {deepClone} from '@/utils'
    import {fetchList, fetchObject, createObject, updateObject, destroyObject} from '@/api/user-address'

    const defaultRow = {
        id: null,
        name: '',
        mobile: '',
        address: '',
        default: false
    }

    export default {
        name: "Address",
        data() {
            return {
                tableKey:0,
                row: Object.assign({}, defaultRow),
                lists: [],
                dialogVisible: false,
                dialogType: 'new',
                checkStrictly: false,
                listLoading:true
            }
        },
        computed: {},
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true
                fetchList().then(response => {
                    this.lists = response.data.items
                    this.listLoading = false
                })
            },
            handleAdd() {
                this.row = Object.assign({}, defaultRow)
                this.dialogType = 'new'
                this.dialogVisible = true
            },
            handleEdit(scope) {
                this.dialogType = 'edit'
                this.dialogVisible = true
                this.checkStrictly = true
                this.row = deepClone(scope.row)
            },
            async confirm() {
                this.loading = true
                const isEdit = this.dialogType === 'edit'
                if (isEdit) {
                    updateObject(this.row.id, this.row).then(response => {
                        this.getList()
                        this.$notify({
                            title: '修改成功',
                            dangerouslyUseHTMLString: true,
                            type: 'success'
                        })
                    }).catch(err => {
                        return false
                    })
                } else {
                    createObject(this.row).then(response => {
                        this.getList()
                        this.$notify({
                            title: '添加成功',
                            dangerouslyUseHTMLString: true,
                            type: 'success'
                        })
                    }).catch(err => {
                    })
                }
                this.loading = true
                this.dialogVisible = false
            },
            handleDelete({$index, row}) {
                this.$confirm('确定删除吗?', 'Warning', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    destroyObject(row.id).then(response => {
                        this.lists.splice($index, 1)
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                    }).catch(err => {

                    })

                }).catch(err => {
                    console.error(err)
                })
            }

        }
    }
</script>

<style lang="scss" scoped>
		.app-container {
				.roles-table {
						margin-top: 30px;
				}
				.permission-tree {
						margin-bottom: 30px;
				}
		}
</style>
