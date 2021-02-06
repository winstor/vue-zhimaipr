<template>
		<div class="box-body">
			<el-table
						element-loading-text="拼命加载中"
						:data="list"
						ref="dragTable"
						@selection-change="handleMultipleSelectionChange"
						@sort-change="sortChange"
						row-key="id" border
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
				<el-table-column align="center"
				                 v-if="!actionData.disableAll"
				                 :label="actionData.label || '操作'"
				                 :width="actionData.width || 300">
						<template slot-scope="scope">
								<slot></slot>
								<el-button v-for="(button,index) in actionData.prepends"
								           :type="button.type || 'success'"
								           :size="button.size || 'small'"
								           @click="handleAction(scope,index)">{{button.label}}
								</el-button>
								<el-button type="success" size="small" v-if="checkAction(scope,'show') && 1===2"
								           @click="handleAction(scope,'show')">查看
								</el-button>
								<el-button type="primary" size="small" v-if="checkAction(scope,'edit')"
								           @click="handleAction(scope,'edit')">编辑
								</el-button>
								<el-button type="danger" size="small" v-if="checkAction(scope,'delete')"
								           @click="handleAction(scope,'delete')"
								>删除
								</el-button>
								<el-button v-if="checkAction(scope,index)"
								           v-for="(button,index) in actionData.appends"
								           :type="button.type || 'success'"
								           :size="button.size || 'small'"
								           @click="handleAction(scope,index)">{{button.label}}
								</el-button>
						</template>
				</el-table-column>
		</el-table>
		</div>
</template>

<script>
    import Sortable from 'sortablejs'

    export default {
        name: "LayGridTable",
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'info',
                    deleted: 'danger'
                }
                return statusMap[status]
            }
        },
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
            },
            isDrag: {
                type: Boolean,
                default: false
            }
        },
        created() {
            this.getList()
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
                sortable: null,
                oldList: [],
                newList: []
            }
        },
        methods: {
            getList() {
                this.oldList = this.list.map(v => v.id)
                this.newList = this.oldList.slice()
                this.$nextTick(() => {
                    this.setSort()
                })
            },
            setSort() {
                if (!this.isDrag) {
                    return false
                }
                const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
                this.sortable = Sortable.create(el, {
                    ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
                    setData: function (dataTransfer) {
                        dataTransfer.setData('Text', '')
                    },
                    onEnd: evt => {
                        const targetRow = this.list.splice(evt.oldIndex, 1)[0]
                        this.list.splice(evt.newIndex, 0, targetRow)
                        this.$emit('drag-change')
                    }
                })
            },
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
        }
    }
</script>

<style>
		.sortable-ghost {
				opacity: .8;
				color: #fff !important;
				background: #42b983 !important;
		}
</style>


<style scoped>
		.icon-star {
				margin-right: 2px;
		}

		.drag-handler {
				width: 20px;
				height: 20px;
				cursor: pointer;
		}

		.show-d {
				margin-top: 15px;
		}
</style>
