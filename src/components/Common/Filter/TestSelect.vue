<template>
		<el-select  v-model="svalue" placeholder="test" clearable>
				<el-option  key="0" label="未监控" value="0"/>
				<el-option  key="1" label="监控中" value="1"/>
		</el-select>
</template>

<script>

    export default {
        name: "TestSelect",
        props: {
            value: {
                type:  [String, Number],
                required: true
            },
        },
		    data(){
            return {
                svalue:this.value
            }
		    },
        watch: {
            value(newVal) {
                this.svalue = newVal;
            },
            svalue(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.$emit("input", this.svalue);
                }
            }
        }
    }
</script>

<style scoped>

</style>