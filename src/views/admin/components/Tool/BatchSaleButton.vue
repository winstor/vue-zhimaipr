<template>
		<el-button class="tool-group four-color" type="success" icon="el-icon-s-promotion" @click="handle()">批量发布交易
		</el-button>
</template>

<script>
    export default {
        name: "BatchSaleButton",
        props: ['value'],
        computed: {
            multipleSelection: {
                get() {
                    return this.value
                }
            }
        },
        methods: {
            handle() {
                if (!this.multipleSelection.length) {
                    this.$message({
                        type: 'error',
                        message: '请选择要操作的行'
                    })
                    return
                }
                let ids = []
                this.multipleSelection.forEach(function (item) {
                    ids.push(item.id)
                })
		            this.$emit('onEnd')
                // deleteObject(this.base_path, ids.join(',')).then(response => {
                //     this.getList()
                //     this.$notify({
                //         title: '操作成功',
                //         dangerouslyUseHTMLString: true,
                //         type: 'success'
                //     })
                // })
            }
        }
    }
</script>

<style scoped>

</style>