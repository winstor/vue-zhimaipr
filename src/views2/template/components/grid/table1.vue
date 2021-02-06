<template>
		<el-table
						element-loading-text="拼命加载中"
						:data="tableData"
						border
						ref="multipleTable"
						@selection-change="handleMultipleSelectionChange"
						@sort-change="sortChange"
		>
				<el-table-column type="selection" align="center"/>
				<el-table-column :title="22" align="center" label="ID" width="100"  :sortable="true" :class-name="getSortClass('name')">
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
				<el-table-column  v-if="!disableAction" align="center" label="操作" width="300">
						<template slot-scope="scope">
								<el-button v-if="!disableShow" type="success" size="small" @click="handleAction(scope,'show')">查看</el-button>
								<el-button v-if="!disableEdit" type="primary" size="small" @click="handleAction(scope,'edit')">编辑</el-button>
								<el-button v-if="!disableDelete" type="danger" size="small" @click="handleAction(scope,'delete')">删除</el-button>
						</template>
				</el-table-column>
		</el-table>
</template>

<script>

    export default {
        name: "GridTable",
        props: {
            value: {
                type: Array,
                default() {
                    return []
                }
            },
            selectionRow:{
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
		        sortDefault:{
                type: String,
                default:'+name',
		        },
		        sortAble:{
                type: Array,
                default() {
                    return []
                }
		        },
            actions: {
                type: Object,
                default() {
                    return {}
                }
            },
            disableAction:{
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
            multipleSelection:{
                get() {
                    return this.selectionRow
                },
                set(val) {
                    this.$emit('update:selectionRow', val)
                }
            },
		        sort:{
                get() {
                    return this.sortDefault
                },
                set(val) {
                    this.$emit('update:sortDefault', val)
                }
		        },
            tableHead: {
                get() {
                    return this.visibleColumns
                }
            },
        },
        data() {
            return {
                key: 1,//可以改变key 进行刷新
                listLoading: true,
            }
        },
        methods: {
            handleMultipleSelectionChange(val){
                this.multipleSelection = val
            },
            handleShow(scope){

            },
            handleEdit(scope) {
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
            },
            handleAction(scope,type){
                this.$parent.handleAction(scope,type)
            },
            sortChange(data) {
                console.log(data)
                const { prop, order } = data
                if (prop === 'id') {
                    this.sortByID(order)
                }
            },
            getSortClass: function(key) {
                const sort = this.sort
                return sort === `+${key}` ? 'ascending' : 'descending'
            }
        },
    }
</script>

<style scoped>

</style>