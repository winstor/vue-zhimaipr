<template>
		<div class="form-box">
				<div class="box box-info">
						<div class="box-header with-border">
								<h3 class="box-title">{{title}}</h3>
								<div class="box-tools"></div>
						</div>
						<div class="box-body">
								<el-form :ref="formName" class="form-container"
								         :model="postForm"
								         :rules="rules"
								         :label-width="labelWidth"
								>
										<slot></slot>
								</el-form>
						</div>
						<div class="box-footer">
								<div class="btn-group" :style="{marginLeft: labelWidth}">
										<el-button v-loading="loading" type="primary" @click="submitForm(formName)">提交</el-button>
										<!--　<el-button @click="resetForm('postForm')">重置</el-button>-->
										<slot name="footer"></slot>
								</div>
						</div>
				</div>
		</div>
</template>

<script>
    export default {
        name: "LayForm",
        props: {
            value: {
                type: Object,
                default() {
                    return {}
                }
            },
            title: {
                type: String,
                default: '创建'
            },
            rules: {
                type: Object,
                default() {
                    return {}
                }
            },
            labelWidth: {
                type: String,
                default: '150px'
            },
            formName: {
                type: String,
                default: 'postForm'
            },
        },
        computed: {
            postForm: {
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
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit("onsubmit", loading => {
                            this.loading = loading
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>