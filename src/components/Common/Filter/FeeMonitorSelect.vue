<template>
		<ly-filter-item prop="is_monitor">
				<el-select v-model="query_list.is_monitor" placeholder="年费监控" clearable>
						<el-option  key="0" label="未监控" value="0"/>
						<el-option  key="1" label="监控中" value="1"/>
				</el-select>
		</ly-filter-item>
</template>

<script>

    export default {
        name: "FeeMonitorSelect",
        props: {
            value: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        computed: {
            query_list:{
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