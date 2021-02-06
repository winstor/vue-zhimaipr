<template>
		<ly-tool>
				<f-share-button v-model="multipleSelection" @onEnd="onEnd"></f-share-button>
				<batch-sale-button v-model="multipleSelection" @onEnd="onEnd"></batch-sale-button>
				<el-button class="tool-group five-color" type="success" icon="el-icon-zoom-in" @click="">加入年费监控
				</el-button>
				<ly-tool-more></ly-tool-more>
				<batch-more>
						<a @click="batchDelete()">批量删除</a>
				</batch-more>
		</ly-tool>
</template>

<script>
    import BatchMore from '@/components/Common/Tool/BatchMore'
    import FShareButton from '@/components/Common/Tool/FShareButton'
    import BatchSaleButton from '@/components/Common/Tool/BatchSaleButton'
    import CreateButton from '@/components/Common/Tool/CreateButton'

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

            },
            onEnd() {
                this.$emit('onEnd')
            }

        }
    }
</script>

<style scoped>

</style>