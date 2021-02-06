<template>
		<el-input v-model="query_list.keyword" :placeholder="placeholder"/>
</template>
<script>
    export default {
        name: "KeywordInput",
        props: {
            value: {
                type: Object,
                default() {
                    return {}
                }
            },
            placeholder:{
                type: String,
                default:'关键字',
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