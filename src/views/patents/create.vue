<template>
		<div>
				<div class="createPost-container" style="background-color: #fff">
						<el-form ref="postForm" :model="postForm"   :rules="rules"  class="form-container">
								<div class="createPost-main-container">
										<el-row>
												<el-col :span="10">
														<el-form-item prop="patent_sn"  label="Author:"  class="postInfo-container-item">
																<el-input v-model="postForm.patent_sn" :maxlength="100" name="patent_sn"  label="专利编号" />
														</el-form-item>
												</el-col>
										</el-row>
								</div>
						</el-form>
				</div>
		</div>

</template>

<script>
    const defaultForm = {
        patent_sn:'',
        patent_name:'',
        patent_type_id:0,
    }

    export default {
        name: "PatentCreate",
		    data(){
					return {
              postForm:Object.assign({}, defaultForm),
					}
		    },
    }
</script>

<style scoped>

</style>