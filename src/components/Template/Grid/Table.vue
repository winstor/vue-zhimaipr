<template>
		<el-table
						element-loading-text="拼命加载中"
						:data="list"
						border
						ref="multipleTable"
						@selection-change="handleMultipleSelectionChange"
						@sort-change="sortChange"
		>
				<el-table-column type="selection" align="center"/>
				<el-table-column v-if="!tableHeader['id']" align="center" label="ID" width="100">
						<template slot-scope="scope">
								{{ scope.$index + 1 }}
						</template>
				</el-table-column>
				<el-table-column
								v-for="(item,column) of tableHeader"
								:key="column"
								:prop="column"
								:label="item.label || $t('table.'+column)"
								:sortable="item.sort"
								:class-name="getSortClass(column)"
				/>
				<el-table-column v-if="actionData" align="center" :label="actionData.label || '操作'"
				                 :width="actionData.width || 300">
						<template slot-scope="scope">
								<el-button
												v-for="(button,index) in actionData.buttons"
												v-if="checkAction(scope,index)"
												@click="handleAction(scope,index)"
												:type="button.type || 'success'"
												:size="button.size || 'small'"
								>
										{{button.label}}
								</el-button>
								<el-button v-if="checkAction(scope,'show')" type="success" size="small" @click="handleAction(scope,'show')">查看</el-button>
								<el-button v-if="checkAction(scope,'edit')" type="primary" size="small" @click="handleAction(scope,'edit')">编辑</el-button>
								<el-button v-if="checkAction(scope,'delete')" type="danger" size="small" @click="handleAction(scope,'delete')">删除</el-button>
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
            visibleColumns: {
                type: Object,
                default() {
                    return {}
                }
            },
            sortDefault: {
                type: String,
                default: '',
            },
            actionData: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        created() {

        },
        computed: {
            list: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('update:value', val)
                }
            },
            sort: {
                get() {
                    return this.sortDefault
                },
                set(val) {
                    this.$emit('update:sortDefault', val)
                }
            },
            tableHeader: {
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
            handleMultipleSelectionChange(val) {
                this.$emit('selection-change', val)
            },
            checkAction(scope, type) {
                let res = true;
                this.$emit('check-action', scope.row, type, val => {
                    res = val
                })
                return res
            },
            handleAction(scope, type) {
                this.$emit('click-action', scope, type)
            },
            sortChange(data) {
                const {prop, order} = data
                let sort_order
                if (order === 'ascending') {
                    this.sort = '+' + prop
                    sort_order = 'desc'
                } else {
                    this.sort = '-' + prop
                    sort_order = 'asc'
                }
                this.$emit('sort-change', prop, sort_order)
            },
            getSortClass: function (key) {
                const sort = this.sort
                if (sort === `+${key}`) {
                    return 'ascending'
                } else if (sort === key) {
                    return 'descending'
                } else {
                    return ''
                }
            }
        },
    }
</script>

<style scoped>

</style>