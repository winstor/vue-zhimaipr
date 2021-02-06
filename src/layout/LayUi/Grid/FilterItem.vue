<template>
		<el-form-item class="filter-item" :prop="prop"  :style="{width:width}">
				<slot></slot>
		</el-form-item>
</template>

<script>
    export default {
        name: "LayFilterItem",
		    props:{
            width:{
                type:String,
                default:'150px'
            },
            prop: String,
		    }
    }
</script>

<style scoped>

</style>