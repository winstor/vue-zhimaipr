<template>
		<el-button v-loading="listLoading" class="tool-group four-color" type="success" icon="el-icon-s-promotion"
		           @click="handle()">批量发布交易
		</el-button>
</template>

<script>
    import {batchSellObject} from '@/api/patent/patent'

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
        data() {
            return {
                listLoading: false
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
                this.listLoading = true
                batchSellObject(ids.join(','), 1).then(response => {
                    this.$message({
                        type: 'success',
                        message: '批量发布成功'
                    })
                    this.$emit('onEnd')
                })
                this.listLoading = false

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