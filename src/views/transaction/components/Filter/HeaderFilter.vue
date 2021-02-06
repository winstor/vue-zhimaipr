<template>
		<ly-filter v-model="query_list" @search="handleFilter" formName="filterPost">
				<patent-type-select v-model="query_list" />
				<patent-status-select v-model="query_list"/>
				<ly-filter-item prop="monitor_status">
						<el-select v-model="query_list.monitor_status" placeholder="监控状态">
								<el-option value="2" label="待维护" key="2"/>
								<el-option value="3" label="年费警告" key="3" />
								<el-option value="1" label="年费正常" key="1" />
						</el-select>
				</ly-filter-item>
				<ly-filter-item prop="start_date">
						<el-date-picker v-model="query_list.start_date" format="yyyy-MM-dd" type="date"
						                style="width: 100%" placeholder="缴费截止日起"/>
				</ly-filter-item>
				<ly-filter-item prop="end_date">
						<el-date-picker v-model="query_list.end_date" format="yyyy-MM-dd" type="date"
						                style="width: 100%" placeholder="缴费截止日止"/>
				</ly-filter-item>
				<ly-filter-item width="200px" prop="keyword">
						<el-input  v-model="query_list.keyword" placeholder="申请号/专利名称/申请人/备注" />
				</ly-filter-item>
		</ly-filter>
</template>

<script>
    import waves from '@/directive/waves'
    import PatentTypeSelect from '@/components/Common/Filter/PatentTypeSelect'
    import PatentStatusSelect from '@/components/Common/Filter/PatentStatusSelect'
    import FeeMonitorSelect from '@/components/Common/Filter/FeeMonitorSelect'
    import TransactionStatusSelect from '@/components/Common/Filter/TransactionStatusSelect'
    import KeywordInput from '@/components/Common/Filter/KeywordInput'

    export default {
        name: "HeaderFilter",
        directives: {
            waves
        },
        components: {
            PatentTypeSelect,
            PatentStatusSelect,
            FeeMonitorSelect,
            TransactionStatusSelect,
            KeywordInput
        },
        props: {
            value: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        computed: {
            query_list: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('update:value', val)
                }
            },
        },
        methods: {
            handleFilter() {
                this.$emit('search')
            },
            handleReset() {
                this.$emit('reset')
            }
        }
    }
</script>

<style scoped>

</style>