<template>
		<div class="box-body">
				<el-table element-loading-text="拼命加载中" border :data="list"
				          @selection-change="handleMultipleSelectionChange"
				>
						<el-table-column type="selection" align="center"/>
						<el-table-column align="center" label="序号" width="100">
								<template slot-scope="scope">{{ scope.$index + 1 }}</template>
						</el-table-column>
						<el-table-column label="专利信息">
								<template slot-scope="scope" width="200">
										<img :src="'/images/patent/type/'+scope.row.patent_type_id+'.png'"/>{{ scope.row.patent_sn }}<br/>{{ scope.row.patent_name }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="申请人">
								<template slot-scope="scope">
										{{ scope.row.patent_person }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="申请日/案件状态">
								<template slot-scope="scope">
										{{ scope.row.apply_date }}<br/>
										<template v-if="item.id === scope.row.patent_status_id" v-for="item in patentStatusOptions">
												{{item.name}}
										</template>
								</template>
						</el-table-column>
						<el-table-column align="center" label="监控状态">
								<template slot-scope="scope">
										{{ scope.row.is_monitor ? '已监控': '未监控'}}
								</template>
						</el-table-column>
						<el-table-column align="center" label="管理员">
								<template slot-scope="scope">
										{{ scope.row.username }}
								</template>
						</el-table-column>
						<el-table-column align="center" label="操作" width="300">
								<template slot-scope="scope">
										<el-button type="primary" size="small" @click="handleAction(scope,'edit','修改费用')">查看详情</el-button>
										<el-button type="primary" size="small" @click="handleAction(scope,'add','添加费用')">添加年费</el-button>
								</template>
						</el-table-column>
				</el-table>
				<el-dialog :visible.sync="dialogVisible" :title="dialogTitle" >
						<add-fee v-model="row" v-if="dialogType === 'add'"></add-fee>
						<edit-fee v-model="row"  v-if="dialogType === 'edit'"></edit-fee>
				</el-dialog>
		</div>
</template>

<script>
    import Sortable from 'sortablejs'
    import AddFee from './Grid/AddFee'
    import EditFee from './Grid/EditFee'

    import {mapState} from 'vuex'

    import {fetchList, updateObject, createObject, deleteObject, batchOrderObject} from '@/api/request'

    export default {
        name: "GridTable",
        components: {AddFee,EditFee},
        props: {
            value: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                key: 1,//可以改变key 进行刷新
                listLoading: true,
                sortable: null,
                oldList: [],
                newList: [],
                dialogVisible: false,
                dialogType: 'add',
                dialogTitle:'添加费用',
                row:{}
            }
        },
        computed: {
            ...mapState({
                patentStatusOptions: state => state.options.patent_status,
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
            handleAction(scope, type,title) {
                this.dialogVisible = true
                this.dialogType = type
                this.dialogTitle = title
                this.row = scope.row
            }
        }
    }
</script>

<style scoped>

</style>
