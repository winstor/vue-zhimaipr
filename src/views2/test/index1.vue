<template>
		<div class="app-container">
				<el-input v-model="filename" placeholder="Please enter the file name (default excel-list)" style="width:350px;" prefix-icon="el-icon-document" />
				<el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handleDownload">
						Export Selected Items
				</el-button>
				<a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank" style="margin-left:15px;">
						<el-tag type="info">Documentation</el-tag>
				</a>
				<el-table :data="tableData" stripe border style="width:100%" highlight-current-row>
						　　<el-table-column type="selection" width="55">
						　　</el-table-column>
						　　<el-table-column prop="phone" label="手机号" align="center" min-width="120">
						　　</el-table-column>
						　　<el-table-column prop="nickname" label="昵称" align="center" min-width="100">
						　　</el-table-column>
						　　<el-table-column prop="createTime" label="注册时间" align="center" min-width="120">
						　　</el-table-column>
						　　<el-table-column prop="enableState" label="用户状态" align="center" min-width="100">
						　　</el-table-column>
						　　<el-table-column prop="tradeState" label="交易状态" align="center" min-width="100">
						　　</el-table-column>
						　　<el-table-column label="操作" align="center" min-width="100">
						　　　　<template slot-scope="scope">
						　　　　　　<el-button type="text" @click="checkDetail(scope.row.phone)">查看详情</el-button>
						　　　　　　<el-button type="info" @click="modifyUser(scope.row.phone)">修改</el-button>
						　　　　　　<el-button type="info" @click="deleteUser(scope.row.phone)">删除</el-button>
						　　　　</template>
						　　</el-table-column>
				</el-table>
		</div>
</template>

<script>
    import { fetchList } from '@/api/article'

    export default {
        name: 'SelectExcel1',
        data() {
            return {
                list: null,
                listLoading: true,
                multipleSelection: [],
                downloadLoading: false,
                filename: '',
                tableData:[],
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.listLoading = true
                fetchList(this.listQuery).then(response => {
                    this.list = response.data.items
                    this.listLoading = false
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
		            console.log(val)
            },
            deleteUser(val){
                console.log(val)
            },
            modifyUser(val){
                let self = this;
            },
            checkDetail(val){
                console.log(val)
            },
            handleDownload() {
                if (this.multipleSelection.length) {
                    this.downloadLoading = true
                    import('@/vendor/Export2Excel').then(excel => {
                        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
                        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
                        const list = this.multipleSelection
                        const data = this.formatJson(filterVal, list)
                        excel.export_json_to_excel({
                            header: tHeader,
                            data,
                            filename: this.filename
                        })
                        this.$refs.multipleTable.clearSelection()
                        this.downloadLoading = false
                    })
                } else {
                    this.$message({
                        message: 'Please select at least one item',
                        type: 'warning'
                    })
                }
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            }
        }
    }
</script>
