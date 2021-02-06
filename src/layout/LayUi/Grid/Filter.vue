<template>
		<form class="filter-container">
				<el-form :ref="formName" :model="query_list">
						<slot></slot>
						<el-button style="padding: 10px" v-waves class="filter-item" type="primary" icon="el-icon-search"
						           @click="handleSearch">搜索
						</el-button>
						<el-button style="padding: 10px" v-waves class="filter-item" type="primary" icon="el-icon-refresh-left"
						           @click="resetFilter">重置
						</el-button>
				</el-form>

		</form>
</template>

<script>
    import waves from '@/directive/waves'

    export default {
        name: "LayFilter",
        directives: {
            waves
        },
        props: {
            value: {
                type: Object,
                default() {
                    return {}
                }
            },
            formName: {
                type: String,
                default: 'postFilter'
            },
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
            handleSearch() {
                this.$emit('search')
            },
            handleReset() {
                this.$refs[formName].resetFields();
                //this.$emit('reset')
            },
            resetFilter() {
                this.$nextTick(() => {
                    this.$refs[this.formName].fields.forEach(function (field) {
                        if (field.fieldValue || field.fieldValue === 0) {
                            field.resetField()
                        }
                    })
                })
                this.$emit('search')
            }
        }
    }
</script>

<style scoped>

</style>