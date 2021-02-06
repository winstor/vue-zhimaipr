<template>
		<ly-tool-item>
				<el-button v-loading="loading" type="success" icon="el-icon-zoom-in" @click="handle">还原</el-button>
		</ly-tool-item>
</template>

<script>
    import {restoreObject} from '@/api/patent/patent/patent-recycle'

    export default {
        name: "PatentRestore",
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
                loading: false
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

            }
        }
    }
</script>


<style lang="scss" scoped>
		.el-button {
				background-color: #5094E7 !important;
				border-color: #5094E7 !important;
		}

		.el-button:hover {
				background-color: #3968a1 !important;
				border-color: #3968a1 !important;
		}
</style>