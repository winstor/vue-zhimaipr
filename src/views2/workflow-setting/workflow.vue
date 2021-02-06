<template>
		<div class="app-container">
				<el-button type="primary" @click="handleAdd">添加流程</el-button>
				<el-table :data="lists" style="width: 100%;margin-top:30px;" border>
						<el-table-column align="center" label="ID" width="220">
								<template slot-scope="scope">
										{{ scope.row.id }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="流程名称">
								<template slot-scope="scope">
										{{ scope.row.workflow_name }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="创建时间"  prop="created_at" :formatter="dateFormat">
						</el-table-column>
						<el-table-column align="center" label="更新时间"  prop="updated_at" :formatter="dateFormat">
						</el-table-column>
						<el-table-column align="center" label="操作" width="400">
								<template slot-scope="scope">
										<router-link :to="'/workflow-setting/workflow/form/'+scope.row.id" class="link-type">
												<el-button type="primary" size="small" icon="el-icon-edit">
														表单设置
												</el-button>
										</router-link>
										&nbsp;&nbsp;&nbsp;&nbsp;
										<router-link :to="'/workflow-setting/workflow/node/'+scope.row.id" class="link-type">
												<el-button type="primary" size="small" icon="el-icon-edit">
														流程设置
												</el-button>
										</router-link>
										&nbsp;&nbsp;&nbsp;&nbsp;
										<el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
										<el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
								</template>
						</el-table-column>
				</el-table>

				<el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑':'新增'">
						<el-form :model="row" label-width="80px" label-position="left">
								<el-form-item label="应用包">
										<el-select v-model="row.group_id"  placeholder="请选择应用包" >
												<el-option v-for="(item, index) in packages" :key="index" :label="item.name" :value="item.id"></el-option>
										</el-select>
								</el-form-item>
								<el-form-item label="流程名称">
										<el-input v-model="row.workflow_name" placeholder="流程名称"/>
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
    import { dateTimeFormat } from "@/utils/date"
    import {getList, getDetail, create, update, destroy} from '@/api/workflow/workflow'
    import {getList as getPackageList} from '@/api/workflow/package'

    const defaultRow = {
        id: '',
        workflow_name: '',
        group_id: '',
        created_at: '',
        updated_at: ''
    }

    export default {
        name: "workflowList",
        data() {
            return {
                row: Object.assign({}, defaultRow),
                packages: [],
                lists: [],
                dialogVisible: false,
                dialogType: 'new',
                checkStrictly: false,
            }
        },
        computed: {},
        created() {
            this.getList()
            this.getPackageList()
        },
        methods: {
            async getPackageList() {
                const res = await getPackageList()
                this.packages = res.data
            },
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
                    const {data} = await create(this.row)
                    this.row.id = data.id
                    this.row.created_at = data.created_at
                    this.row.updated_at = data.updated_at
                    this.lists.push(this.row)
                }

                this.dialogVisible = false
                this.$notify({
                    title: '保存成功',
                    dangerouslyUseHTMLString: true,
                    type: 'success'
                })
            },
            handleDelete({$index, row}) {
                this.$confirm('确定删除吗?', 'Warning', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await destroy(row.id)
                    this.lists.splice($index, 1)
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                }).catch(err => {
                    console.error(err)
                })
            },
            //时间格式转换
            dateFormat:function(row,column){
                let time = dateTimeFormat(row, column);
                return time;
            },

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
