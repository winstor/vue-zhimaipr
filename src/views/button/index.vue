<template>
		<div class="zdy-button">
				<el-button type="primary">primary</el-button>
				<el-button type="success">success</el-button>
				<el-button type="warning">warning</el-button>
				<el-button type="danger">danger</el-button>
				<el-button type="info">info</el-button>
				<el-button type="yellow">黄色-yellow</el-button>
				<el-button type="red">红色-red</el-button>
				<el-button type="light-red">浅红色-light-red</el-button>
				<el-button type="purple">紫色-purple</el-button>
				<el-button type="cyan">青色-cyan</el-button>
				<el-button type="blue">蓝色-blue</el-button>
				<el-button type="green">绿色green</el-button>
		</div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
.zdy-button{
			padding: 50px;
}
.zdy-button button{
		margin: 5px 10px 10px 0;
}
</style>