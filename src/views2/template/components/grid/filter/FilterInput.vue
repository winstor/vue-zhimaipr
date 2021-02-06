<template>
		<el-input v-model="data" :placeholder="label" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
</template>

<script>
    export default {
        name: "FilterInput",
        props: {
            value: {
                type: String,
                default:''
            },
            label:{
                type: String,
                default:'',
            },
            style:{
                type: String,
                default:'',
            }
        },
        computed: {
            data: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('update:value', val)
                }
            },
        },
    }
</script>

<style scoped>

</style>