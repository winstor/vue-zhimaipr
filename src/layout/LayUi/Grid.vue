<template>
		<div class="app-container">
				<slot></slot>
		</div>
</template>

<script>
    import Pagination from '@/components/Pagination'
    import GridTable from './Grid/Table'

    export default {
        name: "LayUiGrid",
        components: {GridTable, Pagination},
        props: {
            value: {
                type: Array,
                default() {
                    return []
                }
            },
            visibleColumns: {
                type: Object,
                default() {
                    return {}
                }
            },
            actionsData:{
                type: Object,
                default() {
                    return {}
                }
            },
            isDrag: {
                type: Boolean,
                default: false
            }
        },
		    computed:{
            list: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('update:value', val)
                }
            },
            tableHeader: {
                get() {
                    return this.visibleColumns
                }
            },
		    },
		    methods:{
            handleSelectionChange(val) {
                this.$emit('selection-change', val)
            },
            sortChange(sort, order) {
                this.$emit('sort-change', sort, order)
            },
            checkAction(val, type, callback) {
                this.$emit('check-action', val, type,callback)
            },
            handleAction(scope, type) {
                this.$emit('click-action', scope, type)
            },
            handleDrag(scope, type) {
                this.$emit('drag-change', scope, type)
            },
		    }
    }
</script>

<style scoped>

</style>