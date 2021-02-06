<template>
		<div id="applyList">
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
    import CkEditor from '@/components/CKEditor'

    export default {
        name: "applyList",
        components: {CkEditor},
        data() {
            return {
                content: "asdasd",
                lists: [],
            };
        },
        created() {
            this.getList()
        },
		    methods:{
            async getList() {
                //const res = await getList()
                //this.lists = res.data
            },

            onClick:function(){
                console.log(this.content)
            },
        }

    }
</script>

<style>

</style>