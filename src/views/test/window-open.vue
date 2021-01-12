<template>
		<el-button @click="close">tt</el-button>
</template>

<script>
    export default {
        name: "window-open",
		    methods:{
            //子
            close(){
                //window.opener.location.reload();//刷新父窗口
                window.opener.document.getElementById("window-open").click()
                window.close();//关闭当前窗口
            },
				    //父
            wechatHandleClick(thirdpart){
                import openWindow from '@/utils/open-window'
                // this.$store.commit('SET_AUTH_TYPE', thirdpart)
                // const appid = 'xxxxx'
                // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
                const url = 'http://localhost:9527/#/open?id=2'
                openWindow(url, thirdpart, 540, 540)
            },
		    }
    }
</script>

<style scoped>

</style>