<template>
		<el-dialog :visible.sync="dialogVisible" :title="madelTitle || '新增'">
				<el-form :model="row" label-width="80px" label-position="left">
						<el-form-item v-for="(item,index) in madelData" :label="item.label || index">
								<el-input v-model="row[index]" :placeholder="item.label || index"/>
						</el-form-item>
						<slot></slot>
				</el-form>
				<div style="text-align:right;">
						<el-button type="danger" @click="dialogVisible=false">取消</el-button>
						<el-button type="primary" @click="confirm">确定</el-button>
				</div>
		</el-dialog>
</template>

<script>
    export default {
        name: "LayGridMadel",
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
            },
            filter:{
                type: Object,
                default() {
                    return {}
                }
            },
            title:{
                type:String,
                default:'新增'
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
            },
            madelData:{
                get() {
                    return this.filter
                }
            },
            madelTitle:{
                get() {
                    console.log(this.title)
                    return this.title
                }
            }
        },
        methods: {
            confirm() {
                this.$emit('confirm')
            }
        }
    }
</script>

<style scoped>

</style>