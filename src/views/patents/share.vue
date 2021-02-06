<template>
		<div class="app-container">
				<div class="filter-container">
						<el-input style="width: 300px" class="filter-item" v-model="listQuery.keyword" placeholder="用户名/姓名/备注名"/>
						<el-button style="padding: 10px" v-waves class="filter-item" type="primary" icon="el-icon-search"
						           @click="getList">搜索
						</el-button>
						<el-button style="padding: 10px" class="filter-item" type="primary" icon="el-icon-refresh-left"
						           @click="handleReset">重置
						</el-button>
				</div>
				<div class="box-body">
						<el-table element-loading-text="拼命加载中" :data="list" @selection-change="handleSelectionChange" border>
								<el-table-column type="selection" align="center"/>
								<el-table-column align="center" label="序号" width="100">
										<template slot-scope="scope">{{ scope.$index + 1 }}</template>
								</el-table-column>
								<el-table-column v-for="(item,column) of tableHeader" :key="column" :prop="column"
								                 :label="item.label || $t('table.'+column)"
								/>
						</el-table>
				</div>
				<el-footer style="margin-top: 20px" align="center">
						<el-button type="primary" @click.native.prevent="confirm">确定分享</el-button>
				</el-footer>
		</div>
</template>

<script>
    import {fetchList} from '@/api/user-friend'

    export default {
        name: "PatentShare",
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
                patent_ids: [],
                multipleSelection: [],
                listLoading: false
            }
        },
        created() {
            this.id = this.$route.params.id
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true
                fetchList(this.listQuery).then(response => {
                    this.list = response.data
                    this.listLoading = false
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            handleReset() {
                this.listQuery.keyword = ''
                this.getList()
            },
            confirm() {

            }
        }
    }
</script>

<style scoped>

</style>