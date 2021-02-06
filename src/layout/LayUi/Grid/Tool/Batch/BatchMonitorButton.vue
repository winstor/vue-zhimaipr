<template>
		<ly-tool-item>
				<el-button v-loading="listLoading"  type="success" icon="el-icon-zoom-in"
				           @click="handle">加入年费监控</el-button>
		</ly-tool-item>
</template>

<script>
    import {batchMonitorObject} from '@/api/patent/patent'

    export default {
        name: "BatchMonitorButton",
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
                batchMonitorObject(ids.join(','), 1).then(response => {
                    this.$message({
                        type: 'success',
                        message: '加入年费监控操作成功'
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


<style lang="scss" scoped>
		.el-button{
				background-color: #5094E7 !important;
				border-color: #5094E7 !important;
		}

		.el-button:hover {
				background-color: #3968a1 !important;
				border-color: #3968a1 !important;
		}
</style>