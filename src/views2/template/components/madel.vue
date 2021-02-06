<template>
		<el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑':'添加'">
				<el-form :model="row" label-width="80px" label-position="left">
						<el-form-item v-for="(item,index) in row" :label="label[index] || index">
								<el-input v-model="row[index]" :placeholder="label[index] || index"/>
						</el-form-item>
				</el-form>
				<div style="text-align:right;">
						<el-button type="danger" @click="dialogVisible=false">取消</el-button>
						<el-button type="primary" @click="confirm">确定</el-button>
				</div>
		</el-dialog>
</template>

<script>
    export default {
        name: "Madel",
        data() {
            return {
                label: {title: "标题", mobile: '电话'},
                dialogType: 'new',
            }
        },
        props: {
            value: {
                type: Object,
                default() {
                    return {}
                }
            },
            visible: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            row: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('update:value', val)
                }
            },
            dialogVisible: {
                get() {
                    return this.visible
                },
                set(val) {
                    this.$emit('update:visible', val)
                }
            }
        },
        methods: {
            confirm() {

            }
        }
    }
</script>

<style scoped>

</style>