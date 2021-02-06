<template>
		<span class="tool-group">
				<el-button class="one-color" type="success" icon="el-icon-share" @click="handleShare">分享好友</el-button>
				<el-dialog :visible.sync="dialogVisible" title="分享给好友">
						<div class="filter-container">
								<el-input style="width: 400px" v-model="listQuery.keyword" placeholder="用户名/姓名/备注名"/>
								<el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
						</div>
						<dialog-table v-loading="listLoading" v-model="list" :visible-columns="tableHeader" @selection-change="handleSelectionChange"/>
						<el-footer style="margin-top: 20px;" align="center">
								<el-button :loading="loading" align="center" type="primary"
								           @click.native.prevent="confirm">确定分享</el-button>
						</el-footer>
			</el-dialog>
		</span>

</template>

<script>
    import DialogTable from '@/components/Common/Grid/DialogTable'

    import {fetchList} from '@/api/user-friend'

    export default {
        name: "PatentShare",
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
                friendSelection: []
            }
        },
        computed: {
            multipleSelection: {
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
                this.loading = true
                let data = {patent_ids:[],friend_ids:[]}
                this.multipleSelection.forEach(function(patent){
                    data.patent_ids.push(patent.id)
                })
                this.friendSelection.forEach(function(user){
                    data.patent_ids.push(user.id)
                })

            },
            handleShare() {
                if (!this.multipleSelection.length) {
                    this.error()
                    return
                }
                this.loading = false
                this.dialogVisible = true
                this.handleReset()
                this.getList()
            },
            handleSelectionChange(val) {
                this.friendSelection = val
            },
            error(msg) {
                let message = msg ? msg : '请选择要操作的行'
                this.$message({
                    type: 'error',
                    message: message
                })
            },
            handleReset(){
                this.listQuery.keyword = ''
            }
        }

    }
</script>

<style scoped>

</style>