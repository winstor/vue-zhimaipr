<template>
		<ly-tool>
				<batch-friend-share-button v-model="multipleSelection" @onEnd="onEnd"/>
				<!--<f-share-button v-model="multipleSelection" @onEnd="onEnd" />-->
				<batch-sale-button v-model="multipleSelection" @onEnd="onEnd"/>
				<batch-monitor-button v-model="multipleSelection" @onEnd="onEnd"/>
				<ly-tool-more>
						<a @click="batchDelete()">批量删除</a>
				</ly-tool-more>
		</ly-tool>
</template>

<script>
    import BatchMore from '@/components/Common/Tool/BatchMore'
    import FShareButton from '@/components/Common/Tool/FShareButton'
    import BatchSaleButton from '@/components/Common/Tool/BatchSaleButton'
    import CreateButton from '@/components/Common/Tool/CreateButton'

    import {deleteObject} from '@/api/patent/patent'

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
        }
    }
</script>

<style scoped>

</style>