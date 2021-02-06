<template>
		<ly-tool>
				<el-button type="primary" icon="el-icon-document" @click="handleDownload">表格导出</el-button>
				<el-button type="yellow" icon="edit" @click="handleDownload">批量备注</el-button>
				<el-button type="red" icon="el-icon-delete" @click="handleDownload">放弃监控</el-button>
				<el-button type="light-red" icon="el-icon-thumb" @click="handleDownload">置为已缴费</el-button>
		</ly-tool>
</template>

<script>
    import BatchMore from '@/components/Common/Tool/BatchMore'
    import FShareButton from '@/components/Common/Tool/FShareButton'
    import BatchSaleButton from '@/components/Common/Tool/BatchSaleButton'
    import CreateButton from '@/components/Common/Tool/CreateButton'

    import {deleteObject} from '@/api/patent/patent'

    export default {
        name: "HeaderTool",
        components: {
            FShareButton,
            BatchSaleButton,
            BatchMore,
            CreateButton,
        },
        props: {
            value: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        computed: {
            multipleSelection: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('update:value', val)
                }
            }
        },
        methods: {
            batchDelete() {
                if (this.multipleSelection.length === 0) {
                    this.$message({type: 'error', message: '请选择要操作的行'})
                }
                let ids = []
                this.multipleSelection.forEach(function (item) {
                    ids.push(item.id)
                })
                deleteObject(ids.join(',')).then(res => {
                    this.$message({message: '操作成功', type: 'success'})
                    this.onEnd()
                }).catch(err => {
                    this.onEnd()
                })
            },
            onEnd() {
                this.$emit('onEnd')
            },
            handleDownload(){

            }
        }
    }
</script>

<style scoped>

</style>