<template>
		<div class="box-body">
				<el-table element-loading-text="拼命加载中" border :data="list"
				          @selection-change="handleMultipleSelectionChange"
				>
						<el-table-column type="selection" align="center"/>
						<el-table-column align="center" label="序号" width="100">
								<template slot-scope="scope">{{ scope.$index + 1 }}</template>
						</el-table-column>
						<el-table-column align="center" label="专利类型">
								<template slot-scope="scope">
										<span v-if="scope.row.patent_type_id == item.key" v-for="item in patentTypes">{{item.name}}</span>
								</template>
						</el-table-column>
						<el-table-column align="center" label="专利编号">
								<template slot-scope="scope">
										{{ scope.row.patent_sn }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="专利名称">
								<template slot-scope="scope">
										{{ scope.row.patent_name }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="申请人">
								<template slot-scope="scope">
										{{ scope.row.patent_person }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="申请日">
								<template slot-scope="scope">
										{{ scope.row.apply_date }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="案件状态">
								<template slot-scope="scope">
										{{ patentStatus[scope.row.patent_status_id] }}
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
                patentStatus: [],
		            patentTypes:[],
            }
        },
        created() {
            this.getPatentStatus()
		        this.$store.dispatch('patent/getTypeOptions').then(options=>{
				        this.patentTypes  = options
		        })
        },
        computed: {
            ...mapState({
                sellStatusOptions: state => state.options.sell_status,
		            patentTypeOptions: state => state.options.patent_type,
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
