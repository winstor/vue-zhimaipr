<template>
		<el-button class="tool-group one-color" type="success" icon="el-icon-share" @click="handleShare">分享好友</el-button>
</template>

<script>
    export default {
        name: "FShareButton",
        props: ['value'],
        computed: {
            multipleSelection: {
                get() {
                    return this.value
                }
            }
        },
        methods: {
            handleShare() {
							console.log(this.multipleSelection)
            }
        }

    }
</script>

<style scoped>

</style>