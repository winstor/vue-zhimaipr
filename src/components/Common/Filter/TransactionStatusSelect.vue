<template>
		<ly-filter-item prop="transaction_status">
		<el-select v-model="query_list.transaction_status" placeholder="交易状态" clearable>
				<el-option v-for="option in options" :key="option.id" :label="option.name"
				           :value="option.id"/>
		</el-select>
		</ly-filter-item>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "TransactionStatusSelect",
        props: {
            value: {
                type: Object,
                default() {
                    return {}
                }
            },
        },
        computed: {
            ...mapState({
                options: state => state.options.transaction_status,
            }),
            query_list: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('update:value', val)
                }
            }
        },
    }
</script>

<style scoped>

</style>