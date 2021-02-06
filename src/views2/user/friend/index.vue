<template>
		<div class="app-container">
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
				<el-table v-loading="listLoading" :data="lists" style="width: 100%;margin-top:30px;" border>
						<el-table-column align="center" label="ID" width="220">
								<template slot-scope="scope">
										{{ scope.$index + 1 }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="用户名">
								<template slot-scope="scope">
										{{ scope.row.username }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="姓名">
								<template slot-scope="scope">
										{{ scope.row.name }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="电话">
								<template slot-scope="scope">
										{{ scope.row.mobile }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="邮箱">
								<template slot-scope="scope">
										{{ scope.row.email }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="备注名">
								<template slot-scope="scope">
										{{ scope.row.note_name }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="是否为常用好友" width="300">
								<template slot-scope="scope">
										<el-switch v-model="scope.row.is_common" active-text="是" inactive-text="否"/>
								</template>
						</el-table-column>
				</el-table>

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
    import {fetchList, applyObject} from '@/api/user-friend'

    const defaultRow = {
        id: null,
		    username:'',
        name: '',
        mobile: '',
        email: '',
        note_name: '',
        is_common:false
    }
    const defaultAddFriend = {
        username: ''
    }

    export default {
        name: "FriendList",
        data() {
            return {
                row: Object.assign({}, defaultRow),
                lists: [],
                dialogVisible: false,
                dialogType: 'new',
                checkStrictly: false,
                listLoading: true,
                listQuery: {keyword: ''},
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
                fetchList({}).then(response => {
                    this.lists = response.data
                    console.log(response.data)
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
            async confirm() {
                this.loading = true
                applyObject(this.addFriend).then(response => {
                    this.getList()
                    this.$notify({
                        title: '提出成功，请耐心等待对方通过',
                        dangerouslyUseHTMLString: true,
                        type: 'success'
                    })
                }).catch(err => {

                })
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
