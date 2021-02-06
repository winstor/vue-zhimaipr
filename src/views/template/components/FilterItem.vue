<template>
		<ly-filter @search="handleFilter" @reset="handleReset">
				<ly-filter-item>
						<patent-type-select v-model="query_list" />
				</ly-filter-item>
				<ly-filter-item>
						<patent-status-select v-model="query_list"/>
				</ly-filter-item>
				<ly-filter-item>
						<fee-monitor-select v-model="query_list"/>
				</ly-filter-item>
				<ly-filter-item>
						<transaction-status-select v-model="query_list"></transaction-status-select>
				</ly-filter-item>
				<ly-filter-item>
						<el-date-picker v-model="query_list.start_apply_date" format="yyyy-MM-dd" type="date"
						                style="width: 100%" placeholder="申请日开始"/>
				</ly-filter-item>
				<ly-filter-item>
						<el-date-picker v-model="query_list.end_apply_date" format="yyyy-MM-dd" type="date"
						                style="width: 100%" placeholder="申请日结束"/>
				</ly-filter-item>
				<ly-filter-item width="200px">
						<keyword-input v-model="query_list" placeholder="申请号/名称/申请人/发明人/其它"/>
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
        name: "FilterItem",
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
            }
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