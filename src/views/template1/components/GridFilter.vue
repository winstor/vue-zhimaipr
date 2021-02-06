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
												style="width: 150px"
												:format="item.format || 'yyyy-MM-dd'"
												:placeholder="item.label || index"
												class="filter-item"
								/>
						</template>
						<template v-else-if="item.type === 'datetime'">
								<el-date-picker
												v-model="listQuery.time"
												type="datetime"
												:format="item.format || 'yyyy-MM-dd HH:mm:ss'"
												:placeholder="item.label || index"
												class="filter-item"
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
    export default {
        name: "GridFilter"
    }
</script>

<style scoped>

</style>