<template>
		<div class="filter-container">
				<slot></slot>
				<el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
						搜索
				</el-button>
				<el-button v-waves class="filter-item" type="primary" icon="el-icon-refresh-left" @click="handleReset">
						重置
				</el-button>
		</div>
</template>

<script>
    import waves from '@/directive/waves'

    // 类型 text,select，date datetime
    export default {
        name: "Index",
        components: {},
        directives: {
            waves
        },
        props: {},
        computed: {},
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

<style lang="scss" scoped>

</style>