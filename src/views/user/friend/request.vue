<template>
		<div class="app-container">
				<div class="box-header"></div>
				<div class="box-body">
						<el-table
										element-loading-text="拼命加载中"
										:data="lists"
										border
										ref="multipleTable"
						>
								<el-table-column type="selection" align="center"/>
								<el-table-column align="center" label="ID" width="100">
										<template slot-scope="scope">
												{{ scope.$index + 1 }}
										</template>
								</el-table-column>
								<el-table-column v-for="(item,column) of tableHeader" align="center"
								                 :label="item.label || $t('table.'+column)">
										<template slot-scope="scope">
												<el-input v-model="scope.row[column]" v-if="item.type === 'input'"
												          @change="handleColumn(scope.row)"></el-input>
												<template v-else>
														{{ scope.row[column] }}{{item.type}}
												</template>
										</template>


								</el-table-column>
								<el-table-column align="center" label="是否为常用好友" width="300">
										<template slot-scope="scope">
												<el-button type="success" size="small" @click="handleRequest(scope.row,1)">通过验证</el-button>
												<el-button type="danger" size="small" @click="handleRequest(scope.row,0)">拒绝请求</el-button>
										</template>
								</el-table-column>
						</el-table>
				</div>
		</div>
</template>

<script>
    import {deepClone} from '@/utils'
    import GridTable from '@/components/Template/Grid/Table'
    import {fetchList, respondObject} from '@/api/user-friend'

    export default {
        name: "FriendRequest",
        components: {GridTable},
        data() {
            return {
                tableHeader: {
                    username: {label: '用户名'},
                    name: {label: '姓名'},
                    mobile: {},
                    email: {},
                },
                lists: [],
                listLoading: true,
                listQuery: {
                    state:0
                },
            }
        },
        computed: {},
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true
                fetchList(this.listQuery).then(response => {
                    this.lists = response.data
                    this.listLoading = false
                })
            },
            handleRequest(row, code) {
                let state = 0
		            if(code){
                    state = 1
		            }
                respondObject(row.id, {state: state}).then(response => {
                    this.getList()
                    this.$message({
                        message: '保存成功',
                        type: 'success',
                        showClose: true,
                        duration: 1000
                    })
                }).catch(err => {})
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
