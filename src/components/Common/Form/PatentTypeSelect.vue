<template>
		<el-select v-model="query_list.patent_type_id" placeholder="专利类型" clearable :class="className">
				<el-option v-for="option in options" :key="option.key" :label="option.name"
				           :value="option.key"/>
		</el-select>
</template>

<script>
    export default {
        name: "PatentTypeSelect",
        props: {
            value: {
                type: Object,
                default() {
                    return {}
                }
            },
            className: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                options: []
            }
        },
        created() {
            this.$store.dispatch("patent/getTypeOptions").then(options => {
                this.options = options
            })
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
    }
</script>

<style scoped>

</style>