<template>
		<ly-filter v-model="query_list" @search="handleFilter" @reset="handleReset">
				<ly-filter-item width="400px" prop="keyword">
						<keyword-input v-model="query_list" placeholder="申请号/名称/申请人"/>
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