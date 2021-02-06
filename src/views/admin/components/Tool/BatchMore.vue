<template>
		<el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
				<div class="avatar-wrapper">
						<el-button class="tool-group" type="success">
								更多操作<i class="el-icon-arrow-down" style="margin-left: 3px"/>
						</el-button>
				</div>
				<el-dropdown-menu class="dropdown-item" slot="dropdown">
						<el-dropdown-item>
								<slot></slot>
						</el-dropdown-item>
				</el-dropdown-menu>
		</el-dropdown>
</template>

<script>
    export default {
        name: "BatchMore"
    }
</script>

<style lang="scss" scoped>
		.tool-group {
				background-color: #E76950 !important;
				border-color: #E76950 !important;
		}

		.tool-group:hover {
				background-color: #c8414a !important;
				border-color: #c8414a !important;
		}

		.dropdown-item {
				min-width: 120px;
				border: 1px solid #eee;
				box-shadow: 5px 5px rgba(102, 102, 102, .1);
		}
</style>