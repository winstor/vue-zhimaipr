<template>
		<el-button class="tool-group" type="success" icon="el-icon-plus" @click="handleCreate()">新增</el-button>
</template>

<script>
    export default {
        name: "CreateButton",
		    methods:{
            handleCreate(){
                this.$emit("click")
            }
		    }
    }
</script>

<style scoped>

</style>