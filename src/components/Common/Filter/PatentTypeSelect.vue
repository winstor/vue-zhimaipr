<template>
		<ly-filter-item prop="patent_type_id">
				<el-select v-model="query_list.patent_type_id" placeholder="专利类型" clearable>
						<el-option v-for="option in options" :key="option.key" :label="option.name"
						           :value="option.key"/>
				</el-select>
		</ly-filter-item>
</template>

<script>
    // import {mapState} from 'vuex'

    export default {
        name: "PatentTypeSelect",
        props: {
            value: {
                type: Object,
                default() {
                    return {}
                }
            },
        },
        computed: {
            // ...mapState({
            //     options: state => state.options.patent_type,
            // }),
            query_list:{
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('update:value', val)
                }
		        }
        },
		    data(){
            return {
                options:[]
            }
		    },
		    created(){
            this.$store.dispatch('options/patentTypeOption').then(res => {
                this.options = res
            })
		    }
    }
</script>

<style scoped>

</style>