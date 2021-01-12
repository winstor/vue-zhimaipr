<template>
		<div class="layout-header">
				<header class="header-main">
						<div class="logo-user">
								<div class="logo">
										<a class="logo-link">
												<img  src="http://www.zhimaipr.com/images/logo_w.png" />
										</a>
								</div>
								<div class="user">
										<el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
												<div class="avatar-wrapper">您好！{{name}}
														<i class="el-icon-caret-bottom" />
												</div>
												<el-dropdown-menu slot="dropdown">
														<router-link to="/profile/index">
																<el-dropdown-item>个人中心</el-dropdown-item>
														</router-link>
														<a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
																<el-dropdown-item>修改密码</el-dropdown-item>
														</a>
														<el-dropdown-item divided @click.native="logout">
																<span style="display:block;">退出登录</span>
														</el-dropdown-item>
												</el-dropdown-menu>
										</el-dropdown>
								</div>
						</div>
						<div class="header-nav">
								<div class="menu-ul-wrapper">
										<nav class="menu-ul">
												<ul class="el-menu">
														<li>
																<router-link :to="'/'" class="link-type">
																		专利库
																</router-link>
														</li>
														<li>
																<router-link :to="'/'" class="link-type">
																		专利管理
																</router-link>
														</li>
														<li>
																<router-link :to="'/'" class="link-type">
																		专利运营
																</router-link>
														</li>
														<li>
																<router-link :to="'/'" class="link-type">
																		统计分析
																</router-link>
														</li>
														<li>
																<router-link :to="'/'" class="link-type">
																		系统设置
																</router-link>
														</li>
												</ul>
										</nav>
								</div>

						</div>
				</header>
		</div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "headNavbar",
        components: {  },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar',
                'device',
                'name'
            ])
        },
        created(){
            this.maxShowHeaderMenu = 1;
        },
		    methods:{
            async logout() {
                await this.$store.dispatch('user/logout')
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            }
		    }
    }
</script>

<style scoped  lang="scss">
.layout-header{
		position: relative;
		box-shadow: 0 10px 5px rgba(0,0,0,.12);
		height: 50px;

		& .header-main{
				position: fixed;
				background-color: #2c4267;
				padding: 0 20px;
				transition: width .3s,height .3s;
				width: 100%;
				height: 50px;
				top:0;
				box-sizing: border-box;
				box-shadow: 0 0 3px 3px rgba(0,0,0,.12);
				overflow: hidden;
				color: #ffffff;
				z-index: 999;

				& .logo-user {
						position: relative;
						width: 100%;
						height: 50px;
						margin: 0 auto;

						& .logo {
								position: absolute;
								left: 0;
								top: 5px;
								height: 40px;

								& .logo-link {
										color: #fff;
										text-decoration: none;
										font-weight: 400;
										height: 100%;
										display: inline-block;

										& img{
												max-height: 35px;
												display: inline-block;
												vertical-align: middle;
										}
								}
						}
						& .user{
								position: absolute;
								right: 0;
								top: 50%;
								height: 50px;
								transform: translateY(-50%);
								line-height: 50px;
								cursor: pointer;

								& .avatar-wrapper{
										color: #ffffff;
								}
						}
				}
				& .header-nav {
						position: absolute;
						left: 300px;
						top: 0;
						width: calc(100vw - 500px);
						min-width: 300px;
						background: none;
						transition: left .3s,top .3s;
						height: 100%;
						overflow: visible;

						& .menu-ul-wrapper{
								display: flex;
								align-items: center;
								justify-content: space-between;
						}
						& .menu-ul{
								overflow: hidden;
								display: block;
								width: 100%;
						}
						& .el-menu {
								display: flex;
								justify-content: space-between;
								align-items: center;
								background: none;
								border: 0!important;

								& li{
										color: #ffffff!important;
										height: 50px;
										line-height: 50px;
										position: relative;
										border: 0!important;
										float: left;
										list-style-type:none;
										padding: 0 5px !important;

										& a{
												color: #ffffff!important;
										}
								}
						}
				}

		}


}
</style>