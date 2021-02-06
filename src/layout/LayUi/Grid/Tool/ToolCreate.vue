<template>
		<ly-tool-item>
				<el-button  type="success" icon="el-icon-plus" @click="handleCreate()">新增</el-button>
		</ly-tool-item>
</template>

<script>
    export default {
        name: "ToolCreate",
        methods:{
            handleCreate(){
                this.$emit("click")
            }
        }
    }
</script>

<style scoped>

</style>