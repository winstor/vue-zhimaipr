<template>
		<div class="app-container">
				<router-link :to="'/workflow/'+id+'/apply-create'" class="link-type">
						<el-button type="primary">添加申请</el-button>
				</router-link>
				<el-table :data="lists" style="width: 100%;margin-top:30px;" border>
						<el-table-column align="center" label="名称">
								<template slot-scope="scope">
										{{ scope.row.title }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="流程进度">
								<template slot-scope="scope">
										{{ scope.row.node_name }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="状态">
								<template slot-scope="scope">
										{{ state_names[scope.row.state] }}
								</template>
						</el-table-column>
						<!--<el-table-column align="center" label="操作" width="300">-->
								<!--<template slot-scope="scope">-->
										<!--<el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>-->
								<!--</template>-->
						<!--</el-table-column>-->
				</el-table>

				<el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑':'添加'">
						<!--<el-form :model="row" label-width="80px" label-position="left">-->
								<!--<el-form-item label="名称">-->
										<!--<el-input v-model="row.name" placeholder="流程包名称"/>-->
								<!--</el-form-item>-->
								<!--<el-form-item v-for="item in form_field" :label="item.field_name">-->
										<!--<el-input v-model="row.data[item.id]" :placeholder="item.field_name"/>-->
								<!--</el-form-item>-->
						<!--</el-form>-->
						<!--<div style="text-align:right;">-->
								<!--<el-button type="danger" @click="dialogVisible=false">取消</el-button>-->
								<!--<el-button type="primary" @click="confirm">确定</el-button>-->
						<!--</div>-->
				</el-dialog>
		</div>
</template>

<script>
    import CkEditor from '@/components/CKEditor'
    import {deepClone} from '@/utils'
    import {getWorkflowFieldList} from '@/api/workflow/field'
    import {getApplyList} from '@/api/workflow/apply'
    import openWindow from '@/utils/open-window'

    const defaultRow = {
        id: null,
        title: '', // 表单字段名称
        data: {}
    }
    export default {
        name: "workflow-index",
        components: {CkEditor,openWindow},
        data() {
            return {
                dialogVisible: false,
                dialogType: "new",
                row: Object.assign({}, defaultRow),
                state_names: ['未开始', '未结束', '已结束'],
                form_field: [],
                lists: [],
            }
        },
        watch: {},
        created() {
            const path = this.$route.path.match(/workflow\/(\d+)$/)
            if (!path[1]) {
                this.$router.go(-1)
            }
            this.id = path[1]
            //this.id = this.$route.params.workflow_id
            this.getApplyList(this.id)
            this.getWorkflowFieldList(this.id)
        },
        methods: {
            async getApplyList(workflow_id) {
                const res = await getApplyList(workflow_id)
                this.lists = res.data
            },
            async getWorkflowFieldList(workflow_id) {
                const res = await getWorkflowFieldList(workflow_id)
                this.form_field = res.data
            },
            async handleAdd() {
                let data = {}
                this.row = Object.assign({}, defaultRow)
                this.form_field.forEach(function (item) {
                    data[item.id] = item.default
                })
                this.row.data = data
                this.dialogType = 'new'
                this.dialogVisible = true
            },
            async confirm() {
                // const isEdit = this.dialogType === 'edit'
                // if (isEdit) {
                //     await update(this.row.id, this.row)
                //
                //     for (let index = 0; index < this.lists.length; index++) {
                //         if (this.lists[index].id === this.row.id) {
                //             this.lists.splice(index, 1, Object.assign({}, this.row))
                //             break
                //         }
                //     }
                // } else {
                //     const {data} = await create(this.row)
                //     this.row.id = data.id
                //     this.row.created_at = data.created_at
                //     this.row.updated_at = data.updated_at
                //     this.lists.push(this.row)
                // }
                //
                // this.dialogVisible = false
                // this.$notify({
                //     title: '保存成功',
                //     dangerouslyUseHTMLString: true,
                //     type: 'success'
                // })
            },
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
		.app-container {
				.roles-table {
						margin-top: 30px;
				}
				.permission-tree {
						margin-bottom: 30px;
				}
		}
</style>
