<template>
		<el-tabs type="border-card">
				<el-tab-pane label="全部" :class="monitor_status?'active':''"></el-tab-pane>
				<el-tab-pane label="待维护"></el-tab-pane>
		</el-tabs>
</template>

<script>
    export default {
        name: "GridTabs",
        data() {
            return {
                monitor_status: ''
            }
        },
        created() {

        },
    }
</script>

<style scoped>

</style>