<template>
		<el-select v-model="query_list.patent_type_id" placeholder="专利类型" clearable :class="className">
				<el-option v-for="option in options" :key="option.id" :label="option.name"
				           :value="option.id"/>
		</el-select>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "PatentTypeSelect",
        props: {
            value: {
                type: Object,
                default() {
                    return {}
                }
            },
		        className:{
                type:String,
				        default:''
		        },
        },
        computed: {
            ...mapState({
                options: state => state.options.patent_type,
            }),
            query_list:{
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('update:value', val)
                }
		        }
        },
    }
</script>

<style scoped>

</style>