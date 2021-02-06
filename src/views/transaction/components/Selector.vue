<template>
		<div class="selector-group">
				<ly-selector v-model="query" :list="list" prop="state" label="缴费截止日" @click="handleClick"/>
		</div>
</template>

<script>
    export default {
        name: "Selector",
        props: {
            value: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                list: [
                    {id: 0, name: '全部'},
                    {id: 1, name: '30天以内'},
                    {id: 2, name: '半年以内'},
                    {id: 3, name: '已过期'}
                ]
            }
        },
        computed: {
            query: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('update:value', val)
                }
            }
        },
        methods: {
            handleClick() {
                this.$emit('click')
            }
        }
    }
</script>

<style scoped>

</style>