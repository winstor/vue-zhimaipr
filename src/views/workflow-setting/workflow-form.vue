<template>
		<div>
				<el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
						<sticky :z-index="10" class-name="sub-navbar draft">
								<el-button v-loading="loading" type="warning" @click="draftForm">保存</el-button>
								<el-button v-loading="loading" type="success" @click="publishForm">发布</el-button>
						</sticky>
						<div class="dndList" style="margin-top: 10px">
								<div class="dndList-list field-type-container">
										<h3>普通类型</h3>
										<draggable :list="fieldTypes" class="dragArea" @move="checkMove" @end="onEnd"
										           v-bind="{group:{name: 'field-form',pull:'clone',put:false},sort: false}">
												<el-button v-for="(element,index) in fieldTypes" :key="index" class="list-complete-item button"
												           type="primary" @click="pushEle(element)">
														{{ element.field_name }}
												</el-button>
										</draggable>
								</div>
								<div class="dndList-list field-container">
										<h3>表单字段设置</h3>
										<div class="list-complete-item">
												<div class="list-complete-item-handle">
														<span style="font-weight: bold">流程名称</span>
														<div style="margin-top: 5px">
																<form-tag-setting :placeholder="placeholder='流程名称'" :disabled="true"/>
														</div>
												</div>
										</div>
										<draggable :set-data="setData" :list="list" class="dragArea"
										           v-bind="{group:{name: 'field-form',pull:false},sort: true}" @end="end">
												<div v-for="(element,index) in list" :key="index" class="list-complete-item">
														<div class="list-complete-item-handle" @click="handleEdit(element,index)">
																<span style="font-weight: bold">{{ element.field_name }}</span>
																<div style="margin-top: 5px">
																		<form-tag-setting :slug="element.slug" :model.sync="element.default"
																		                  :placeholder="element.field_name" :disabled="true"/>
																</div>
														</div>
														<div style="position:absolute;right:0px;">
								            <span style="float: right ;margin-top: -20px;margin-right:5px;" @click="deleteEle(index)">
								              <i style="color:#ff4949" class="el-icon-delete"/>
								            </span>
														</div>
												</div>
										</draggable>
								</div>
						</div>
				</el-form>
				<el-dialog :visible.sync="dialogVisible" :title="dialogType">
						<el-form :model="row" label-width="80px" label-position="left">
								<el-form :model="row" label-width="80px" label-position="left">
										<el-form-item label="名称">
												<el-input v-model="row.field_name" placeholder="名称"/>
										</el-form-item>
										<el-form-item label="默认值">
												<el-input v-model="row.default" placeholder="默认值"/>
										</el-form-item>
										<el-form-item v-if="isShowOptions" label="选择项">
												<div v-for="(item,index) in row_options">
														<el-input type="text" v-model="row_options[index]" placeholder="请输入选择项..."
														          style="width: 80%"/>
														<a @click="delOptions(index)" style="margin-left: 10px"><i style="color:#ff4949" class="el-icon-delete"/></a>
												</div>
												<a @click="addOptions()">
														<i class="el-icon-plus"/>
												</a>
										</el-form-item>

								</el-form>
						</el-form>
						<div style="text-align:right;">
								<el-button type="danger" @click="dialogVisible=false">取消</el-button>
								<el-button type="primary" @click="confirm">确定</el-button>
						</div>
				</el-dialog>
		</div>
</template>

<script>
    import {deepClone} from '@/utils'
    import draggable from 'vuedraggable'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import {getFieldTypeList, getWorkflowFieldList, saveWorkflowField, publishWorkflowField} from '@/api/workflow/field'
    import FormTagSetting from './components/FormTagSetting'

    const defaultRow = {
        id: null,
        field_name: '', // 表单字段名称
        slug: '', //  表单字段类型标识符
        default: '', //  默认值
        options: '', //  选择项
        relation_wid: 0, //  关联业务流程id
        relation_fid: 0, //   关联字段id
    }

    export default {
        name: "settingWorkflowForm",
        components: {draggable, Sticky, FormTagSetting},

        //props: {},
        data() {
            const validateRequire = (rule, value, callback) => {
                if (value === '') {
                    this.$message({
                        message: rule.field + '为必传项',
                        type: 'error'
                    })
                    callback(new Error(rule.field + '为必传项'))
                } else {
                    callback()
                }
            }
            const validateSourceUri = (rule, value, callback) => {
                if (value) {
                    if (validURL(value)) {
                        callback()
                    } else {
                        this.$message({
                            message: '外链url填写不正确',
                            type: 'error'
                        })
                        callback(new Error('外链url填写不正确'))
                    }
                } else {
                    callback()
                }
            }
            return {
                postForm: Object.assign({}, defaultRow),
                row: Object.assign({}, defaultRow),
                row_index: -1,
                row_options: [],
                optionSlug: ['radio', 'checkbox'],
                dialogType: '设置',
                isShowOptions: true,
                dialogVisible: false,
                loading: false,
                //userListOptions: [],
                rules: {
                    // image_uri: [{validator: validateRequire}],
                    // title: [{validator: validateRequire}],
                    // content: [{validator: validateRequire}],
                    // source_uri: [{validator: validateSourceUri, trigger: 'blur'}]
                },
                list: [],
                fieldTypes: [],
                fieldName: {},
                id: null,
                edit_status: 0,
            }
        },
        created() {
            this.id = this.$route.params.id
            this.getList(this.id)
            this.getFieldTypeList()
        },
        methods: {
            async getList(id) {
                const res = await getWorkflowFieldList(id)
                this.list = res.data
            },
            async getFieldTypeList() {
                const res = await getFieldTypeList()
                for (let type of res.data) {
                    this.fieldName[type.slug] = type.field_cname
                    this.fieldTypes.push({field_name: type.field_cname, slug: type.slug})
                }
            },
            //添加选择项
            addOptions() {
                this.row_options.push('')
            },
            //删除选择项
            delOptions(index) {
                this.row_options.splice(index, 1)
            },
            showOptions(row) {
                this.isShowOptions = false
                this.row_options = []
                if (this.inArray(row.slug, this.optionSlug)) {
                    this.isShowOptions = true
                    if (row.options) {
                        if (typeof row.options === 'string') {
                            this.row_options = JSON.parse(row.options);
                        } else {
                            this.row_options = row.options
                        }
                    }
                }
            },
            handleEdit(row, index) {
                this.dialogVisible = true
                //显示选择项
                this.showOptions(row)

                this.row = deepClone(row)
                this.row_index = index
            },
            confirm() {
                let row = Object.assign({}, this.row)
                row.options = this.row_options.length > 0 ? JSON.stringify(this.row_options) : '';
                if (row.relation_wid <= 0 || row.relation_fid <= 0) {
                    row.relation_wid = 0
                    row.relation_fid = 0
                }
                this.list.splice(this.row_index, 1, row)
                this.dialogVisible = false
                this.$message({
                    message: '已修改',
                    type: 'success',
                    showClose: true,
                    duration: 1000
                })
            },
            // 保存
            async draftForm() {
                if(!this.checkList()){
                    return false
                }
                this.loading = true
                const res = await saveWorkflowField(this.id, this.list)
                this.list = res.data
                this.$message({
                    message: '保存成功',
                    type: 'success',
                    showClose: true,
                    duration: 1000
                })
                this.loading = false
                //this.postForm.status = 'draft'
            },
            // 发布
            async publishForm() {
                this.loading = true
                const res = await publishWorkflowField(this.id)
                this.$message({
                    message: '发布成功',
                    type: 'success',
                    showClose: true,
                    duration: 1000
                })
                this.loading = false
            },
            checkList() {
                for (let i = 0; i < this.list.length; i++) {
				            if(this.inArray(this.list[i].slug, this.optionSlug) && this.list[i].options.length === 0){
                        this.$message.error(this.list[i].field_name+"-请添加选择项")
				                return false
				            }
                }
                return true
            },
            deleteEle(index) {
                this.list.splice(index, 1)
            },
            setData(dataTransfer) {
                // to avoid Firefox bug
                // Detail see : https://github.com/RubaXa/Sortable/issues/1012
                dataTransfer.setData('Text', '')
            },
            checkMove(evt) {
                console.log(evt, 'checkMove....')
                // return false
            },
            change(evt) {
                //console.log(evt, 'change...')
                // console.log(this.list, 'list...')
            },
            //start ,end ,add,update, sort, remove 得到的都差不多
            start(evt) {
                //this.drag=false
                console.log(evt, 'start1...')
            },
            end(evt) {
                console.log(evt, 'end1....')
                return false
            },
            onEnd(evt) {
                this.list[evt.newIndex] = Object.assign({}, defaultRow, this.list[evt.newIndex])
                console.log(evt, 'end2....')
                //return true
            },
            move(evt, originalEvent) {
                console.log(evt, 'move')
                console.log(originalEvent) //鼠标位置
            },
            //点击添加字段
            pushEle(ele) {
                this.list.push(Object.assign({}, defaultRow, ele))
            },
            onMove(e, originalEvent) {
                this.moveId = e.relatedContext.element.id;
                //不允许停靠
                if (e.relatedContext.element.id == 1) return false;
                //不允许拖拽
                if (e.draggedContext.element.id == 4) return false;
                if (e.draggedContext.element.id == 11) return false;
                return true;
            },
            inArray(val, arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] === val) {
                        return true
                    }
                }
                return false
            }
        }
    }
</script>


<style lang="scss" scoped>
		.components-container {
				position: relative;
				height: 100vh;
		}

		.left-container {
				background-color: #F38181;
				height: 100%;
				min-width: 200px;
		}

		.right-container {
				background-color: #FCE38A;
				height: 200px;
		}

		.top-container {
				background-color: #FCE38A;
				width: 100%;
				height: 100%;
		}

		.bottom-container {
				width: 100%;
				background-color: #95E1D3;
				height: 100%;
		}

		.dndList {
				background: #fff;
				padding-bottom: 40px;
				&:after {
						content: "";
						display: table;
						clear: both;
				}
				.dndList-list {
						float: left;
						padding-bottom: 30px;
						&:first-of-type {
								margin-right: 2%;
						}
						.dragArea {
								margin-top: 15px;
								min-height: 50px;
								padding-bottom: 30px;
						}
				}
		}

		.list-complete-item {
				cursor: pointer;
				position: relative;
				font-size: 14px;
				padding: 5px 12px;
				margin-top: 6px;
				border: 1px solid #bfcbd9;
				transition: all 1s;
		}

		.list-complete-item-handle {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-right: 50px;
		}

		.list-complete-item-handle2 {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-right: 20px;
		}

		.list-complete-item.sortable-chosen {
				background: #4AB7BD;
		}

		.list-complete-item.sortable-ghost {
				background: #30B08F;
		}

		.field-type-container {
				position: absolute;
				width: 250px;
				padding: 10px;
				margin-left: 10px;
				border: 1px solid #bfcbd9;
				height: 100%;
		}

		.field-type-container button {
				margin-left: 5px;
				width: 100px;
		}

		.field-container {
				position: absolute;
				width: 500px;
				padding: 10px;
				border: 1px solid #bfcbd9;
				height: 100%;
				left: 260px;
		}

		.field-edit-container {
				position: absolute;
				width: 300px;
				padding: 10px;
				border: 1px solid #bfcbd9;
				height: 100%;
				right: -350px;
				background: #ffffff;
		}

		.field-edit-container.show {
				right: 0;
				transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
		}
</style>