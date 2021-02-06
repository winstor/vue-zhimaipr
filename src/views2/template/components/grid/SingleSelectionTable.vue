<template>
		<el-table
						element-loading-text="拼命加载中"
						:data="tableData"
						border
						@row-click="handleSingleSelectionChange"
		>
				<el-table-column width="100">
						<template slot-scope="scope">
								<el-radio  v-model="singleSelection" style="margin-left: 10px;">
										<span></span>
								</el-radio>
						</template>
				</el-table-column>
				<el-table-column align="center" label="ID" width="100">
						<template slot-scope="scope">
								{{ scope.$index + 1 }}
						</template>
				</el-table-column>
				<el-table-column align="center" v-for="(item,column) in tableHead"
				                 :label="item.label || $t('table.'+column)">
						<template slot-scope="scope">
								{{ scope.row[column] }}
						</template>
				</el-table-column>
				<el-table-column v-if="!disableActions" align="center" label="操作" width="300">
						<template slot-scope="scope">
								<el-button v-if="!disableEdit" type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
								<el-button v-if="!disableDelete" type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
						</template>
				</el-table-column>
		</el-table>
</template>
<script>
    export default {
        name: "SingleSelectionTable",
        props: {
            value: {
                type: Array,
                default() {
                    return []
                }
            },
            visibleColumns: {
                type: Object,
                default() {
                    return {}
                }
            },
            isEdit: {
                default: false,
                type: Boolean
            },
            isDelete: {
                default: false,
                type: Boolean
            },
            actions: {
                type: Array,
                default() {
                    return [
                        {
                            type: 'edit',
                            label: '编辑',
                        }
                    ]
                }
            },
            disableActions: {
                default: false,
                type: Boolean
            },
            disableEdit: {
                default: false,
                type: Boolean
            },
            disableDelete: {
                default: false,
                type: Boolean
            },
            disableShow: {
                default: true,
                type: Boolean
            }
        },
        created() {
            console.log(this.$route)
        },
        computed: {
            tableData: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('update:value', val)
                }
            },
            tableHead: {
                get() {
                    return this.visibleColumns
                },
                // set(val) {
                //     this.$emit('update:visibleColumns', val)
                // }
            },
        },
        data() {
            return {
                key: 1,//可以改变key 进行刷新
                listLoading: true,
                singleSelection: {},
            }
        },
        methods: {
            //单选
            handleSingleSelectionChange(selection, row){
                console.log('当用户手du动勾选数zhi据行的 Checkbox 时触发的事件', selection, row)
                if (selection.length > 1) {
                    let del_row = selection.shift();
                    // console.log('把数组的第一个元素从其中删除后', selection);
                    this.$refs.multipleTable.toggleRowSelection(del_row, false);
                    // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
                }
                this.singleSelection = row
            },
            handleEdit(scope) {
                console.log(this.$t)
                if (typeof this.$parent.handleEdit === 'function') {
                    this.$parent.handleEdit(scope)
                } else {

                }
            },
            handleDelete(scope) {
                if (typeof this.$parent.handleDelete === 'function') {
                    this.$parent.handleDelete(scope)
                } else {
                    alert("请定义方法：handleDelete")
                }
            }
        },
    }
</script>

<style scoped>

</style>