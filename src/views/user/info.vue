<template>
		<div class="createPost-container"  style="background-color: #fff">
				<el-form ref="postForm" :model="postForm"   :rules="rules"  class="form-container">
						<sticky :z-index="10" :class-name="'sub-navbar '+status">
								<el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
										保存
								</el-button>
						</sticky>

						<div class="createPost-main-container">
								<el-row>
										<el-col :span="24">
												<el-form-item  prop="title">
														<MDinput v-model="postForm.username" :maxlength="100" name="username" disabled>
																用户名
														</MDinput>
												</el-form-item>
												<el-form-item prop="name">
														<MDinput v-model="postForm.name" :maxlength="100" name="name">
																真实姓名/名称
														</MDinput>
												</el-form-item>
												<el-form-item prop="email">
														<MDinput v-model="postForm.email" :maxlength="100" name="email">
																电子邮件
														</MDinput>
												</el-form-item>
												<el-form-item  prop="mobile">
														<MDinput v-model="postForm.mobile" :maxlength="100" name="mobile">
																手机号码
														</MDinput>
												</el-form-item>
												<el-form-item  prop="qq">
														<MDinput v-model="postForm.qq" :maxlength="100" name="qq">
																QQ号码
														</MDinput>
												</el-form-item>
												<el-form-item  prop="wechat_number">
														<MDinput v-model="postForm.wechat_number" :maxlength="100" name="wechat_number">
																微信号
														</MDinput>
												</el-form-item>
										</el-col>
								</el-row>
								<el-form-item prop="avatar" >
										<Upload v-model="postForm.avatar" />
								</el-form-item>
						</div>
				</el-form>
		</div>
</template>

<script>
    import Tinymce from '@/components/Tinymce'
    import Upload from '@/components/UploadImage/SingleImage'
    import MDinput from '@/components/MDinput'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { fetchUser, updateUser } from '@/api/user'

    const defaultForm = {
		    username:'',
		    name:'',
		    mobile:'',
		    email:'',
		    qq:'',
		    wechat_number:'',
        avatar: '',
    }
    export default {
        name: "Info",
        components: { Tinymce, MDinput, Upload, Sticky },
        data() {
            const validateRequire = (rule, value, callback) => {
		            if(rule.type === 'mobile'){
		                let reg = /^1[3,4,5,6,7,8,9]\d{9}$/
                    if (!reg.test(value)) {
                        callback(new Error(rule.message))
                    }else{
                        callback()
                    }
		            }else if(rule.type === 'qq' && value){
                    let reg = /^[1-9]\d*$/;
		                if(!reg.test(value)){
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
		            rawData:{},
                diffData:false,
                loading: false,
                rules: {
		                mobile:[
		                    { required: true, message: '电话不能为空', trigger: 'blur'},
                        { type: 'mobile', message: '请输入真确电话', trigger: 'blur' ,validator: validateRequire }
		                ],
		                name:[{ required: true, message: '请输入姓名', trigger: 'blur'}],
		                email:[
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                    ],
		                qq:[
		                    {
		                        type: 'qq', message: '请输入正确QQ', trigger: 'blur' ,validator: validateRequire }
		                    ]
                },
            }
        },
		    watch:{
            v1:function(){
                console.log("改变")
            }
		    },
        created() {
            this.fetchUser()
        },
        methods:{
            fetchUser() {
                fetchUser().then(response => {
		                Object.assign(this.postForm,response.data)
                    this.rawData =  Object.assign({},this.postForm)
                }).catch(err => {

                })
            },
            diffFormData () {
                for (let k in this.rawData) {
                    if (this.rawData[k] !== this.postForm[k]) {
                        this.diffData = true
		                    return true
                    }
                }
                this.diffData = false
            },
		        submitForm(){
				        if(!this.diffFormData()){
                    this.$notify({
                        title: '成功',
                        message: '保存成功',
                        type: 'success',
                        duration: 2000
                    })
										return
				        }
                this.$refs.postForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        updateUser(this.postForm).then(response => {
                            this.rawData =  Object.assign({},this.postForm)
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