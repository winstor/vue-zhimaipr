<template>
		<div class="createPost-container">
				<el-form ref="postForm" :model="postForm" class="form-container">
						<sticky :z-index="10"  class-name="sub-navbar draft">
								<el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
										提交
								</el-button>
						</sticky>

						<div class="createPost-main-container">
								<el-form-item style="margin-bottom: 40px;" prop="title">
										<MDinput v-model="postForm.title" :maxlength="100" name="name" required>描述</MDinput>
								</el-form-item>
								<el-form-item v-for="item in form_field" :label="item.field_name">
										<Upload v-if="item.slug === 'file'" v-model="postForm.data[item.id]" />
										<c-k-editor v-else-if="item.slug === 'editor'" v-model="postForm.data[item.id]" />
										<el-radio-group v-else-if="item.slug === 'radio'"  v-model="postForm.data[item.id]">
												<el-radio v-for="option in item.options" :label="option">{{option}}</el-radio>
										</el-radio-group>
										<el-input v-else v-model="postForm.data[item.id]" :placeholder="item.field_name" />
								</el-form-item>
						</div>
				</el-form>
		</div>
</template>

<script>
    import Tinymce from '@/components/Tinymce'
    import CKEditor from '@/components/CKEditor'
    import Upload from '@/components/UploadImage/SingleImage'
    import MDinput from '@/components/MDinput'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { validURL } from '@/utils/validate'
    import { createWorkflowApply } from '@/api/workflow/apply'
    import { getWorkflowFieldList } from '@/api/workflow/field'

    const defaultForm = {
        //id: undefined,
        title: '', // 表单字段名称
        data:{},
        image_uri:'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'
    }

    export default {
        name: 'ApplyDetail',
        components: { Tinymce, MDinput, Upload, Sticky, CKEditor},
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                postForm: Object.assign({}, defaultForm),
                loading: false,
                form_field:[],
                userListOptions: [],
                submit_status:false
            }
        },
        computed: {
            // contentShortLength() {
            //     return this.postForm.content_short.length
            // },
            // displayTime: {
            //     get() {
            //         return (+new Date(this.postForm.display_time))
            //     },
            //     set(val) {
            //         this.postForm.display_time = new Date(val)
            //     }
            // }
        },
        created() {
            this.workflow_id = this.$route.params.workflow_id;
		        this.fetchWorkflowField(this.workflow_id);
            if (this.isEdit) {
                const id = this.$route.params.id;
                this.fetchData(id)
            }
        },
        methods: {
            async fetchWorkflowField(workflow_id){
                return new Promise((resolve, reject) => {
                    getWorkflowFieldList(workflow_id).then(response => {
                        this.form_field = response.data
		                    if(!this.isEdit){
                            let data = {};
                            this.form_field.forEach(function(item){
                                if(item.options){
                                    item.options = JSON.parse(item.options)
                                }
                                data[item.id] = item.default
                            });
                            this.postForm.data = data
		                    }
                        resolve(true)
                    }).catch(err => {
                        console.log(err)
                        reject(false)
                    })
                });
            },
            fetchData(id) {
                // fetchArticle(id).then(response => {
                //     this.postForm = response.data
                // }).catch(err => {
                //     console.log(err)
                // })
            },
            submitForm() {
                this.$refs.postForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        createWorkflowApply(this.workflow_id,this.postForm).then(() => {
                            this.$notify({
                                title: '成功',
                                message: '提交成功',
                                type: 'success',
                                duration: 2000
                            })
                            this.loading = false
                            this.submit_status = true
                            this.$store.dispatch('tagsView/delView', this.$route)
                            this.$router.go(-1)
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
		@import "~@/styles/mixin.scss";

		.createPost-container {
				position: relative;

				.createPost-main-container {
						padding: 40px 45px 20px 50px;

						.postInfo-container {
								position: relative;
								@include clearfix;
								margin-bottom: 10px;

								.postInfo-container-item {
										float: left;
								}
						}
				}

				.word-counter {
						width: 40px;
						position: absolute;
						right: 10px;
						top: 0px;
				}
		}

		.article-textarea ::v-deep {
				textarea {
						padding-right: 40px;
						resize: none;
						border: none;
						border-radius: 0px;
						border-bottom: 1px solid #bfcbd9;
				}
		}
</style>
