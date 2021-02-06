<template>
		<el-form :model="row" label-width="80px" label-position="left">
				<el-form-item v-for="(item,index) in row" :label="label[index] || index">
						<el-input v-model="row[index]" :placeholder="label[index] || index"/>
				</el-form-item>
		</el-form>
</template>

<script>
    export default {
        name: "FormIndex"
    }
</script>

<style scoped>

</style>