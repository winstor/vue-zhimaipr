<template>
		<div>
				<el-menu
								class="_layout-header"
								router
								mode="horizontal"
								:default-active="modulePath"
								background-color="#304156"
								text-color="#fff"
								active-text-color="#409EFF"
								style="border:none"
								ref="elHeader"
				>
						<el-menu-item
										v-for="m in $store.state.user.routers.slice(0,maxShowHeaderMenu)"
										:index="m.path"
										:key="m.meta.id"
						>{{ m.meta.title }}</el-menu-item>
						<el-submenu index="/more" v-if="$store.state.user.routers.length>maxShowHeaderMenu">
								<template slot="title">更多</template>
								<el-menu-item
												v-for="m in $store.state.user.routers.slice(maxShowHeaderMenu)"
												:index="m.path"
												:key="m.meta.id"
								>{{ m.meta.title }}</el-menu-item>
						</el-submenu>
						<el-submenu index="/my" style="float:right;">
								<template slot="title">{{$store.state.user.name}}</template>
								<el-menu-item index @click="logout">注销</el-menu-item>
						</el-submenu>
				</el-menu>
		</div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import router, { resetRouter } from '@/router'
    export default {
        name: "LayoutHeader",
        created(){
            this.maxShowHeaderMenu = 6;
        },
		    data(){
          return {
              modulePath:'',
          }
		    },
        methods:{
            async logout() {
                router.addRoutes([])
                //await this.$store.dispatch('user/logout')
                //this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            }
        }
    }
</script>

<style scoped>

</style>