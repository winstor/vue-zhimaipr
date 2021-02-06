<template>
		<div class="app-container">
				<div class="box-header">
						<div class="filter-container">
								<el-input v-model="listQuery.keyword" placeholder="用户名/姓名" style="width: 300px;padding-right: 5px"
								          class="filter-item" @keyup.enter.native="handleFilter"/>
								<el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
										搜索
								</el-button>
								<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus"
								           @click="handleApply">
										添加好友
								</el-button>
						</div>
				</div>
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
												<el-input v-model="scope.row[column]" v-if="item.type === 'input'" @change="handleColumn(scope.row)"></el-input>
												<template v-else>
														{{ scope.row[column] }}{{item.type}}
												</template>
										</template>


								</el-table-column>
								<el-table-column align="center" label="是否为常用好友" width="300">
										<template slot-scope="scope">
												<el-switch
																v-model="scope.row.is_common"
																active-text="是"
																inactive-text="否"
																@change="handleColumn(scope.row)"
												/>
										</template>
								</el-table-column>
						</el-table>
				</div>

				<el-dialog :visible.sync="dialogVisible" title="添加好友">
						<el-form :model="addFriend" label-width="100px" label-position="left">
								<el-form-item label="好友用户名">
										<el-input v-model="addFriend.username" placeholder="请输入好友用户名"/>
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
    import GridTable from '@/components/Template/Grid/Table'
    import {fetchList, applyObject, updateObject} from '@/api/user-friend'

    const defaultRow = {
        id: null,
        username: '',
        name: '',
        mobile: '',
        email: '',
        note_name: '',
        is_common: false
    }
    const defaultAddFriend = {
        username: ''
    }

    export default {
        name: "FriendList",
        components: {GridTable},
        data() {
            return {
                tableHeader: {
                    username: {label: '用户名'},
                    name: {label: '姓名'},
                    mobile: {},
                    email: {},
                    note_name: {type: 'input'}
                },
                row: Object.assign({}, defaultRow),
                lists: [],
                dialogVisible: false,
                dialogType: 'new',
                checkStrictly: false,
                listLoading: true,
                listQuery: {
                    keyword: ''
                },
                addFriend: {username: ''}
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

            handleFilter() {
                this.listLoading = true
                fetchList(this.listQuery).then(response => {
                    this.lists = response.data
                    this.listLoading = false
                })
            },
            handleApply() {
                this.addFriend = Object.assign({}, defaultAddFriend)
                this.dialogVisible = true

            },
            handleAdd() {
                this.row = Object.assign({}, defaultRow)
                this.dialogVisible = true
            },
            handleEdit(scope) {
                this.dialogVisible = true
                this.checkStrictly = true
                this.row = deepClone(scope.row)
            },
            confirm() {
                this.loading = true
                applyObject(this.addFriend).then(response => {
                    this.$notify({
                        title: '提出成功，请耐心等待对方通过',
                        dangerouslyUseHTMLString: true,
                        type: 'success'
                    })
                }).catch(err => {})
                this.loading = true
                this.dialogVisible = false
            },
            handleColumn(row){
                updateObject(row.id, row).then(response => {
                    this.$message({
                        message: '保存成功',
                        type: 'success',
                        showClose: true,
                        duration: 1000
                    })
                }).catch(err => {
                    this.getList()
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
