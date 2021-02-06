<template>
		<el-select
						v-if="options"
						v-model="_value"
						:placeholder="_value"
						clearable
						class="filter-item"
		>
				<el-option v-for="option in options" :key="option.value" :label="option.text"
				           :value="option.value"/>
		</el-select>
</template>

<script>

    export default {
        name: "PatentTypeSelect",
		    props:{
            value:{
                type:String,
		            default:''
            },
				    title:{
                type:String,
                default:'专利类型'
            },
		    },
		    computed:{
            _value:{
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('update:value', val)
                }
            },
				    _title:{
                get() {
                    return this.title
                },
				    }
		    },
		    data(){
            return {
                options:[]
            }
		    },
		    methods:{

		    }
    }
</script>

<style scoped>

</style>