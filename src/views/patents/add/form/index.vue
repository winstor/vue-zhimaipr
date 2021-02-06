<template>
		<ly-form v-model="postForm" :rules="rules" @onsubmit="submitForm" ref="postForm">
				<el-form-item prop="patent_sn" label="专利号:">
						<el-input v-model="postForm.patent_sn" placeholder="专利号"/>
				</el-form-item>
				<el-form-item prop="patent_name" label="专利名称:">
						<el-input v-model="postForm.patent_name" placeholder="专利名称"/>
				</el-form-item>
				<el-form-item prop="patent_type_id" label="专利类型:">
						<patent-type-select v-model="postForm"/>
				</el-form-item>
				<el-form-item prop="patent_status_id" label="专利状态:">
						<patent-status-select v-model="postForm"/>
				</el-form-item>
				<el-form-item prop="patent_person" label="申请人:">
						<el-input v-model="postForm.patent_person" placeholder="申请人"/>
				</el-form-item>
				<el-form-item prop="apply_date" label="申请日期:">
						<el-date-picker v-model="postForm.apply_date" format="yyyy-MM-dd" type="date" placeholder="申请日期"/>
				</el-form-item>
		</ly-form>
</template>

<script>
    import PatentStatusSelect from '@/components/Common/Form/PatentStatusSelect'
    import PatentTypeSelect from '@/components/Common/Form/PatentTypeSelect'

    import {createObject} from '@/api/patent/patent'

    const defaultForm = {
        patent_sn: '',
        patent_name: '',
        patent_person: '',
        patent_type_id: '',
        patent_status_id: '',
        apply_date: '',
    }

    export default {
        name: "PatentCreate",
        components: {PatentStatusSelect, PatentTypeSelect},
        data() {
            return {
                postForm: Object.assign({}, defaultForm),
                rules: {
                    patent_sn: [{required: true, message: '请输入专利号', trigger: 'blur'}],
                    patent_name: [{required: true, message: '请输入专利名称', trigger: 'blur'}],
                    patent_type_id: [{required: true, message: '请选择专利类型', trigger: 'change'}],
                    patent_status_id: [{required: true, message: '请选择专利状态', trigger: 'change'}]
                },
            }
        },
        methods: {
            submitForm(callback) {
                createObject(this.postForm).then(response => {
                    this.$message({message: '提交成功', type: 'success'})
                    callback(true)
                }).catch(err => {
                    callback(false)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
