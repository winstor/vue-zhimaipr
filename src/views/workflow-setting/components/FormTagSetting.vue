<!-- 子组件 -->
<template>
		<el-input v-if="type == 'mobile'" type="number"  v-model="config"  :disabled="disabled"  :placeholder="placeholder"></el-input>
		<el-radio-group v-else-if="type == 'radio'" v-model="config" :disabled="disabled">
				<el-radio label="选项1"></el-radio>
				<el-radio label="选项2"></el-radio>
		</el-radio-group>
		<el-checkbox-group  v-else-if="type == 'checkbox'" v-model="config" style="padding: 5px 15px;" :disabled="disabled" >
				<el-checkbox label="选项1">选项1</el-checkbox>
				<el-checkbox   label="选项2">选项2</el-checkbox>
		</el-checkbox-group>

		<el-input v-else :type="type"  v-model="config"  :disabled="disabled"  :placeholder="placeholder"></el-input>
</template>

<script>
    export default {
        props: {
            placeholder:{
                type: String,
                default: '请输入内容',
            },
		        disabled: {
                type:Boolean,
                default:false
		        },
		        model:String,
		        slug:{
                type: String,
                default: 'text',
            },
        },
        data() {
					return {
					    workflow_id:0
					}
        },
        created() {
            this.workflow_id = this.$route.params.id
        },
		    computed:{
            config: {
                get(){
									return this.model
                },
		            set(val){
                    this.$emit('update:model',val)
		            }
            },
            type: {
                get(){
                    return this.slug
                },
                set(val){
                    this.$emit('update:slug',val)
                }
				    }
		    }
    }
</script>