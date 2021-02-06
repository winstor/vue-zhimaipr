<template>
		<div class="tool-container">
				<el-button class="tool-group one-color" type="success" icon="el-icon-share">分享好友
				</el-button>
				<el-button v-if="1===2" class="tool-group" type="success" icon="el-icon-plus" @click="handleCreate()">新增
				</el-button>
				<el-button class="tool-group four-color" type="success" icon="el-icon-plus" @click="batchSale()">批量发布交易
				</el-button>
				<el-button class="tool-group five-color" type="success" icon="el-icon-zoom-in" @click="">加入年费监控
				</el-button>
				<el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
						<div class="avatar-wrapper">
								<el-button class="tool-group seven-color" type="success">
										更多操作<i class="el-icon-arrow-down" style="margin-left: 3px"/>
								</el-button>
						</div>
						<el-dropdown-menu class="dropdown-item" slot="dropdown">
								<el-dropdown-item>
										<a @click="batchDelete()">批量删除</a>
								</el-dropdown-item>
						</el-dropdown-menu>
				</el-dropdown>
		</div>
</template>

<script>
    export default {
        name: "TButtonItem",
        props: {
            list: {
                type: Array,
                default() {
                    return []
                },
            },
            moreData: {
                type: Array,
                default() {
                    return []
                },
            }
        },
        computed: {
            toolData: {
                get() {
                    return this.list
                },
            },
            _moreData: {
                get() {
                    return this.moreData
                },
            }
        },
        methods: {
            handleClick() {

            },
            handleList() {
                let openData = []
                let moreData = []
                this._list.forEach(function (item, index) {
                    if (index < this._openMax) {
                        openData.push(item)
                    } else {
                        moreData.push(item)
                    }
                })
                this.openData = openData
                this.moreData = moreData
            }
        }
    }
</script>

<style lang="scss" scoped>
		.dropdown-item {
				min-width: 120px;
				border: 1px solid #eee;
				box-shadow: 5px 5px rgba(102, 102, 102, .1);
		}

</style>