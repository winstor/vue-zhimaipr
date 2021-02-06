<template>
		<ly-tool-item>
				<el-button class="one-color" type="success" icon="el-icon-share" @click="handleShare">分享好友</el-button>
				<el-dialog :visible.sync="dialogVisible" title="分享给好友">
						<div class="filter-container">
								<el-input style="width: 400px;margin-right: 5px" v-model="listQuery.keyword" placeholder="用户名/姓名/备注名"/>
								<el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
						</div>
						<dialog-table
										v-loading="listLoading"
										v-model="list"
										:visible-columns="tableHeader"
										@selection-change="handleSelectionChange"
						/>
						<el-footer style="margin-top: 20px;" align="center">
								<el-button :loading="loading" align="center" type="primary" @click.native.prevent="confirm">确定分享
								</el-button>
						</el-footer>
				</el-dialog>
		</ly-tool-item>
</template>

<script>
    import DialogTable from '@/components/Common/Grid/DialogTable'

    import {fetchList} from '@/api/user-friend'
    import {batchShareObject} from '@/api/patent/patent'

    export default {
        name: "FriendShareButton",
        components: {DialogTable},
        props: ['value'],
        data() {
            return {
                tableHeader: {
                    username: {label: '用户名'},
                    name: {label: '姓名'},
                    note_name: {label: '备注名'},
                },
                listQuery: {
                    page: 1,
                    limit: 100,
                    keyword: '',
                },
                list: [],
                dialogVisible: false,
                listLoading: false,
                loading: false,
                multipleSelection: []
            }
        },
        computed: {
            patentIdSelection: {
                get() {
                    return this.value
                }
            }
        },
        created() {

        },
        methods: {
            getList() {
                this.listLoading = true
                fetchList(this.listQuery).then(response => {
                    this.list = response.data
                    this.listLoading = false
                })
            },
            confirm() {
                if (!this.multipleSelection.length || !this.patentIdSelection.length) {
                    if (!this.patentIdSelection.length) {
                        this.error()
                        this.dialogVisible = false
                    } else {
                        this.error('请选择要分享的好友')
                    }
                    return
                }
                this.loading = true
                let patent_ids = []
                let user_ids = []
                this.patentIdSelection.forEach(function (patent) {
                    patent_ids.push(patent.id)
                })
                this.multipleSelection.forEach(function (user) {
                    user_ids.push(user.friend_user_id)
                })
                batchShareObject(patent_ids.join(','), user_ids.join(',')).then(response => {
                    this.loading = false
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.$emit("onEnd")
                }).catch(err => {
                    this.loading = false
                })
                this.dialogVisible = false
            },
            handleShare() {
                if (!this.patentIdSelection.length) {
                    this.error()
                    return
                }
                this.getList()
                this.loading = false
                this.dialogVisible = true
                this.handleReset()

            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            error(msg) {
                let message = msg ? msg : '请选择要操作的行'
                this.$message({
                    type: 'error',
                    message: message
                })
            },
            handleReset() {
                this.listQuery.keyword = ''
            }
        }
    }
</script>

<style scoped>

</style>