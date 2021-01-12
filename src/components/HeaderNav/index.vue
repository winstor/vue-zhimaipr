<template>
		<div  class="header-nav">
				<div class="right-menu">
						<template v-if="device!=='mobile'">
								<search id="header-search" class="right-menu-item" />
								<error-log class="errLog-container right-menu-item hover-effect" />
								<screenfull id="screenfull" class="right-menu-item hover-effect" />
								<el-tooltip content="Global Size" effect="dark" placement="bottom">
										<size-select id="size-select" class="right-menu-item hover-effect" />
								</el-tooltip>
						</template>

						<el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
								<div class="avatar-wrapper">
										<img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
										<i class="el-icon-caret-bottom" />
								</div>
								<el-dropdown-menu slot="dropdown">
										<router-link to="/profile/index">
												<el-dropdown-item>Profile</el-dropdown-item>
										</router-link>
										<a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
												<el-dropdown-item>Docs</el-dropdown-item>
										</a>
										<el-dropdown-item divided @click.native="logout">
												<span style="display:block;">Log Out</span>
										</el-dropdown-item>
								</el-dropdown-menu>
						</el-dropdown>
				</div>

		</div>
</template>

<script>
    export default {
        name: "HeaderNav",
		    data(){
            return {
                show: false,
            }
		    }
    }
</script>

<style scoped>
.header-nav{
		width: 100%;
		height: 50px;
		background-color: #2c3e50;
		color: #ffffff;
}
</style>