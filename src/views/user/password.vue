<template>
		<div class="createPost-container" style="background-color: #fff">
				<el-form ref="postForm" :model="postForm"   :rules="rules"  class="form-container">
						<sticky :z-index="10" :class-name="'sub-navbar '+status">
								<el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
										保存
								</el-button>
						</sticky>

						<div class="createPost-main-container">
								<el-row>
										<el-col :span="24">
												<el-form-item prop="lastPassword">
														<MDinput v-model="postForm.lastPassword" :maxlength="100" name="lastPassword" type="password">
																原密码
														</MDinput>
												</el-form-item>
												<el-form-item prop="newPassword">
														<MDinput v-model="postForm.newPassword" :maxlength="100" name="newPassword" type="password">
																新密码(新密码至少四位数)
														</MDinput>
												</el-form-item>
												<el-form-item  prop="newPasswordConfirm">
														<MDinput v-model="postForm.newPasswordConfirm" :maxlength="100" name="newPasswordConfirm" type="password">
																确认新密码
														</MDinput>
												</el-form-item>
										</el-col>
								</el-row>
						</div>
				</el-form>
		</div>
</template>

<script>
    import MDinput from '@/components/MDinput'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { changePassword } from '@/api/user'

    const defaultForm = {
        lastPassword:'',
        newPassword:'',
        newPasswordConfirm:'',
    }
    export default {
        name: "Password",
        components: { MDinput, Sticky },
        data() {
            const validateRequire = (rule, value, callback) => {
                console.log(rule)
		            if(rule.field === 'newPassword'){
										if(rule.type === 'check' && value.length < 4){
                        callback(new Error(rule.message))
										}else {
                        callback()
										}
		            }else if(rule.field === 'newPasswordConfirm' && rule.type === 'confirm'){
                    if(this.postForm.newPasswordConfirm !== this.postForm.newPassword){
                        callback(new Error(rule.message))
                    }else {
                        callback()
                    }
                }else {
                    callback()
		            }
            }
            return {
                status: 'draft',
                postForm: Object.assign({}, defaultForm),
                loading: false,
                rules: {
                    lastPassword:[
                        { required: true, message: '请输入原密码', trigger: 'blur'},
                    ],
                    newPassword:[
                        { required: true, message: '请输入新密码', trigger: 'blur'},
                        { type: 'check', message: '新密码至少四位数', trigger: 'blur',validator: validateRequire  }
                        ],
                    newPasswordConfirm:[
                        { required: true, message: '请确认新密码', trigger: 'blur'},
                        { type: 'confirm', message: '新密码不一致', trigger: 'blur',validator: validateRequire  }
                    ],
                },
            }
        },

        methods:{
            submitForm(){
                this.$refs.postForm.validate(valid => {
                    if (valid) {
                        this.loading = true
		                    const data = {
                            password:this.postForm.lastPassword,
				                    newPassword:this.postForm.newPassword,
                        }
                        changePassword(data).then(response => {
                            this.postForm =  Object.assign({},defaultForm)
                            this.$notify({
                                title: '成功',
                                message: '保存成功',
                                type: 'success',
                                duration: 2000
                            })
                            this.loading = false
                        }).catch(err => {
                            return false
                        })
                        this.status = 'published'
                        this.loading = false
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
        },
    }
</script>

<style  lang="scss" scoped>
		@import "~@/styles/mixin.scss";

		.createPost-container {
				position: relative;

				.createPost-main-container {
						padding: 0 20px 20px 50px;

						.postInfo-container {
								position: relative;
								@include clearfix;
								margin-bottom: 5px;

								.postInfo-container-item {
										float: left;
								}
						}
				}
		}
</style>