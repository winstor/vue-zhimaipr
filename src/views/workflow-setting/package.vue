<template>
		<div class="app-container">
				<el-button type="primary" @click="handleAdd">添加流程包</el-button>
				<el-table :data="lists" style="width: 100%;margin-top:30px;" border>
						<el-table-column  align="center" label="ID" width="220">
								<template slot-scope="scope">
										{{ scope.row.id }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="流程包名称">
								<template slot-scope="scope">
										{{ scope.row.name }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="操作" width="300">
								<template slot-scope="scope">
										<el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
										<el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
								</template>
						</el-table-column>
				</el-table>

				<el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑':'添加'">
						<el-form :model="row" label-width="80px" label-position="left">
								<el-form-item label="名称">
										<el-input v-model="row.name" placeholder="流程包名称" />
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
    import { deepClone } from '@/utils'
    import { getList, getDetail, create, update, destroy } from '@/api/workflow/package'

    const defaultRow = {
        id: '',
        name: '',
    }

    export default {
        name:"workflowPackage",
        data() {
            return {
                row: Object.assign({}, defaultRow),
                lists: [],
                dialogVisible: false,
                dialogType: 'new',
                checkStrictly: false,
            }
        },
        computed: {},
        created() {
            this.getList()
        },
        methods: {
            async getList() {
                const res = await getList()
                this.lists = res.data
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
                const isEdit = this.dialogType === 'edit'
                if (isEdit) {
                    await update(this.row.id, this.row)

                    for (let index = 0; index < this.lists.length; index++) {
                        if (this.lists[index].id === this.row.id) {
                            this.lists.splice(index, 1, Object.assign({}, this.row))
                            break
                        }
                    }
                } else {
                    const { data } = await create(this.row)
                    this.row.id = data.id
                    this.lists.push(this.row)
                }

                this.dialogVisible = false
                this.$notify({
                    title: '保存成功',
                    dangerouslyUseHTMLString: true,
                    type: 'success'
                })
            },
            handleDelete({ $index, row }) {
                this.$confirm('确定删除吗?', 'Warning', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
		                    await destroy(row.id)
                        this.lists.splice($index, 1)
                        this.$message({
                            type: 'success',
                            message: '删除成功'
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
