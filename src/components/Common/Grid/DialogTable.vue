<template>
		<el-table v-loading="listLoading" element-loading-text="拼命加载中" border
		          :data="list"
		          @selection-change="handleSelectionChange"
		>
				<el-table-column type="selection" align="center"/>
				<el-table-column v-if="!tableHeader['id']" align="center" label="序号" width="100">
						<template slot-scope="scope">
								{{ scope.$index + 1 }}
						</template>
				</el-table-column>
				<el-table-column
								v-for="(item,column) of tableHeader"
								:key="column" :prop="column"
								:label="item.label || $t('table.'+column)"
				/>
		</el-table>
</template>

<script>

    export default {
        name: "DialogTable",
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
            vLoading:{
                type: Boolean,
		            default:false
            }
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
            tableHeader: {
                get() {
                    return this.visibleColumns
                }
            },
            listLoading:{
                get() {
                    return this.vLoading
                }
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.$emit('selection-change', val)
            }
        }
    }
</script>

<style scoped>

</style>
