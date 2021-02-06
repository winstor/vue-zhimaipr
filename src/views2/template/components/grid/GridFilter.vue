<template>
		<div class="filter-container">
				<template v-if="index in listQuery" v-for="(item,index) in lists">
						<template v-if="item.type === 'select'">
								<el-select
												v-if="item.options"
												v-model="listQuery[index]"
												:placeholder="item.label || index"
												clearable
												class="filter-item"
								>
										<el-option v-for="option in item.options" :key="option.value" :label="option.text"
										           :value="option.value"/>
								</el-select>
						</template>
						<template v-else-if="item.type === 'date'">
								<el-date-picker
												v-model="listQuery.time"
												type="date"
												:format="item.format || 'yyyy-MM-dd'"
												:placeholder="item.label || index"
								/>
						</template>
						<template v-else-if="item.type === 'datetime'">
								<el-date-picker
												v-model="listQuery.time"
												type="datetime"
												:format="item.format || 'yyyy-MM-dd HH:mm:ss'"
												:placeholder="item.label || index"
								/>
						</template>
						<template v-else>
								<el-input
												v-model="listQuery[index]"
												:placeholder="item.label || index"
												class="filter-item"
												@keyup.enter.native="handleFilter"
								/>
						</template>
				</template>
				<el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
						搜索
				</el-button>
				<el-button v-waves class="filter-item" type="primary" icon="el-icon-refresh-left" @click="handleReset">
						重置
				</el-button>
		</div>
</template>

<script>
    import waves from '@/directive/waves'
    // 类型 text,select，date datetime
    export default {
        name: "GridFilter",
        directives: {
            waves
        },
        props: {
            value: {
                type: Object,
                default() {
                    return {}
                }
            },
            data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        computed: {
            listQuery: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('update:value', val)
                }
            },
            lists: {
                get() {
                    return this.data
                }
            }
        },
        methods: {
            handleFilter() {
                this.$emit('search')
            },
            handleReset() {
                console.log(this.lists,'handleReset')
                for(let index in this.lists){
                    if( this.listQuery.hasOwnProperty(index)){
                        this.listQuery[index] = ''
                    }
		            }

                this.$emit('search')
            }
        },
    }
</script>

<style lang="scss" scoped>
		.filter-container {
				padding-bottom: 10px;
				& .el-input {
						width: 200px;
				}
				& .el-select {
						width: 150px;
				}
				& .filter-item {
						margin-bottom: 0;
						margin-right: 5px;
				}
		}
</style>