<template>
		<div class="box-body">
				<el-table element-loading-text="拼命加载中" border :data="list"
				          @selection-change="handleMultipleSelectionChange"
				>
						<el-table-column type="selection" align="center"/>
						<el-table-column align="center" label="序号" width="100">
								<template slot-scope="scope">{{ scope.$index + 1 }}</template>
						</el-table-column>
						<el-table-column align="center" label="专利信息">
								<template slot-scope="scope" width="200">
										<img src="/faming.png"/>{{ scope.row.patent_sn }}<br/>{{ scope.row.patent_name }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="申请人">
								<template slot-scope="scope">
										{{ scope.row.patent_person }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="申请日/年费">
								<template slot-scope="scope">
										{{ scope.row.apply_date }}<br/>
										{{ scope.row.is_monitor ? '已监控': '未监控'}}
								</template>
						</el-table-column>
						<el-table-column align="center" label="案件状态">
								<template slot-scope="scope">
										{{ patentStatus[scope.row.patent_status_id] }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="管理员">
								<template slot-scope="scope">
										{{ scope.row.username }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="交易状态">
								<template slot-scope="scope">
										<span v-if="scope.row.sell_status === item.id"
										      v-for="item in sellStatusOptions">{{ item.name }}</span>
								</template>
						</el-table-column>
						<el-table-column align="center" label="操作" width="300">
								<template slot-scope="scope">
										<el-button type="primary" size="small" @click="handleAction(scope,'edit')">编辑</el-button>
										<el-button type="danger" size="small" @click="handleAction(scope,'delete')">删除</el-button>
								</template>
						</el-table-column>
				</el-table>
		</div>
</template>

<script>
    import Sortable from 'sortablejs'

    import {mapState} from 'vuex'

    import {fetchList, updateObject, createObject, deleteObject, batchOrderObject} from '@/api/request'

    export default {
        name: "PatentTable",
        props: {
            value: {
                type: Array,
                default() {
                    return []
                }
            },
        },
        data() {
            return {
                key: 1,//可以改变key 进行刷新
                listLoading: true,
                sortable: null,
                oldList: [],
                newList: [],
                patentStatus: []
            }
        },
        created() {
            this.getPatentStatus()
        },
        computed: {
            ...mapState({
                sellStatusOptions: state => state.options.sell_status,
            }),
            list: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('update:value', val)
                }
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
            getPatentStatus() {
                let patentStatus = {}
                this.$store.state.options.patent_status.forEach(function (item) {
                    patentStatus[item.id] = item.name
                })
                this.patentStatus = patentStatus
            },
            setSort() {
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
            }
        }
    }
</script>

<style scoped>

</style>
