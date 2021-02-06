<template>
		<ly-tool>
				<ly-tool-item>
						<el-button class="five-color"  v-loading="loading" type="success" icon="el-icon-top-left" @click="handleRestore">还原</el-button>
				</ly-tool-item>
				<ly-tool-item>
						<el-button class="seven-color" v-loading="loading" type="success" icon="el-icon-delete-solid" @click="handleDestroy">永久删除</el-button>
				</ly-tool-item>
		</ly-tool>
</template>

<script>
    import BatchMore from '@/components/Common/Tool/BatchMore'
    import FShareButton from '@/components/Common/Tool/FShareButton'
    import BatchSaleButton from '@/components/Common/Tool/BatchSaleButton'
    import CreateButton from '@/components/Common/Tool/CreateButton'

    import {restoreObject, deleteObject} from '@/api/patent/patent-recycle'

    export default {
        name: "ToolItem",
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
        data() {
            return {
                loading: false
            }
        },
        methods: {
            handleRestore() {
                if(!this.checkMultipleSelection()){
											return
                }
                let ids = []
                this.multipleSelection.forEach(function (item) {
                    ids.push(item.id)
                })
                this.loading = true
                restoreObject(ids.join(',')).then(response => {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.loading = false
                    this.$emit('onEnd')
                }).catch(err => {
                    this.loading = false
                })
            },
            handleDestroy() {
                if(!this.checkMultipleSelection()){
                    return
                }
                let ids = []
                this.multipleSelection.forEach(function (item) {
                    ids.push(item.id)
                })
                this.loading = true
                deleteObject(ids.join(',')).then(response => {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.loading = false
                    this.$emit('onEnd')
                }).catch(err => {
                    this.loading = false
                })
            },
            onEnd() {
                this.$emit('onEnd')
            },
		        checkMultipleSelection(msg){
                if (!this.multipleSelection.length) {
                    this.$message({
                        type: 'error',
                        message: msg ? msg :'请选择要操作的行'
                    })
                    return false
                }
                return true
		        },
        }
    }
</script>

<style scoped>

</style>