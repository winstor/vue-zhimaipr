<template>
		<div class="app-container">
				<el-input v-model="filename" placeholder="Please enter the file name (default excel-list)" style="width:350px;" prefix-icon="el-icon-document" />
				<el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handleDownload">
						Export Selected Items
				</el-button>
				<a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank" style="margin-left:15px;">
						<el-tag type="info">Documentation</el-tag>
				</a>
				<el-table
								ref="multipleTable"
								v-loading="listLoading"
								:data="list"
								element-loading-text="拼命加载中"
								border
								fit
								highlight-current-row
								@selection-change="handleSelectionChange"
								@row-click="clickData"
				>
						<el-table-column type="selection" align="center" />
						<el-table-column width="100" prop="selection">
				    <template slot-scope="scope">
								<!--@change.native="getTemplateRow(scope.$index,scope.row)"-->
								<el-radio :label="scope.row.id" v-model="templateRadio"   style="margin-left: 10px;">
										<span></span>
								</el-radio>
          </template>
						</el-table-column>
						<el-table-column align="center" label="Index" width="95">
								<template slot-scope="scope">
										{{ scope.$index }}
								</template>
						</el-table-column>
						<el-table-column label="ID">
								<template slot-scope="scope">
										{{ scope.row.id }}
								</template>
						</el-table-column>
						<el-table-column label="Title">
								<template slot-scope="scope">
										{{ scope.row.title }}
								</template>
						</el-table-column>
						<el-table-column label="Author" width="110" align="center">
								<template slot-scope="scope">
										<el-tag>{{ scope.row.author }}</el-tag>
								</template>
						</el-table-column>
						<el-table-column label="Readings" width="115" align="center">
								<template slot-scope="scope">
										{{ scope.row.pageviews }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="PDate" width="220">
								<template slot-scope="scope">
										<i class="el-icon-time" />
										<span>{{ scope.row.display_time }}</span>
								</template>
						</el-table-column>
				</el-table>
		</div>
</template>

<script>
    import { fetchList } from '@/api/article'

    export default {
        name: 'SelectExcel',
        data() {
            return {
                list: null,
                listLoading: true,
                multipleSelection: [],
                downloadLoading: false,
                filename: '',
                templateRadio:false
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
            clickData(row, column, event) {
                console.log(row,  'row11111111111')
                console.log(column,'column222222222222222')
                console.log(event,'event222222222222222')
		            this.templateRadio = row.id
            },
            getChange(index,row){
							console.log("getChange111111111111111")
                console.log(this.templateRadio)
            },
            getTemplateRow(index,row){
                console.log("getTemplateRow111111111111111")
                //this.templateRadio = index
		            console.log(this.templateRadio)
            },
		        //单选
            handleSelection(selection, row){
                console.log('当用户手du动勾选数zhi据行的 Checkbox 时触发的事件', selection, row)
                if (selection.length > 1) {
                    let del_row = selection.shift();
                    // console.log('把数组的第一个元素从其中删除后', selection);
                    this.$refs.multipleTable.toggleRowSelection(del_row, false);
                    // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
                }
            },
		        //多选
            handleSelectionChange(val) {
                //this.multipleSelection = val
		            //console.log(val)
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
