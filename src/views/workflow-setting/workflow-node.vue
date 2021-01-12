<template>
		<div style="height: 100%">
				<el-container style="height: 100%">
						<el-header class="header-box" style="padding: 0">
								<sticky :z-index="10" class-name="sub-navbar draft" style="width: 100%;height: 100%">
										<el-button v-loading="loading" type="warning" @click="draftForm">保存</el-button>
										<el-button v-loading="loading" type="success" @click="publishForm">发布</el-button>
								</sticky>
						</el-header>
						<el-container style="height: 100%;">
								<el-aside width="200px" class="item-box">
										<div class="nav-box" v-for="(item,index) in itemListL" :key="index" style="padding: 0 25px">
												<div draggable="true" :class="'getItem node_'+item.type" @mouseout="dragEnd"
												     @mousedown="dragStart(index)" @mouseup="dragStop">
														{{item.label}}
												</div>
										</div>
										<!--<div class=" nav-box">-->
												<!--<el-button type="primary" size="small" @click="saveBtn"> 提交数据</el-button>-->
										<!--</div>-->
								</el-aside>
								<el-container>
										<el-main class="main-box">
												<div class="center-box">
														<!--<div>-->
														<!--<el-button v-if="isDrag" type="primary" @click="onDrag">开始连线</el-button>-->
														<!--<el-button  v-if="!isDrag"  type="primary" @click="onDrag">结束连线</el-button>-->
														<!--</div>-->
														<div id="canvasBox" ref="canvasBox"></div>
												</div>

												<div class="info-box" id="setting-right-box">
														<div class="show-box">
																<el-form ref="form" label-width="80px">
																		<el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
																				<el-tab-pane label="基本设置" name="1">
																						<el-form-item label="名称">
																								<el-input v-model="graph_lable" @change="changeItem"></el-input>
																						</el-form-item>
																						<el-form-item label="人员">
																								<el-drag-select v-model="graph_user" multiple placeholder="请选择"
																								                @change="changeNodeUser">
																										<el-option v-for="user in users" :key="user.id" :label="user.name"
																										           :value="user.id"/>
																								</el-drag-select>
																						</el-form-item>
																				</el-tab-pane>
																				<el-tab-pane label="字段设置" name="2">
																						<el-form-item v-for="(field,index) in graph_field"
																						              :label="field.field_name">
																								<el-radio-group v-model="graph_field[index].state">
																										<el-radio :label="0" :key="0" style="margin-right:5px"> 隐藏
																										</el-radio>
																										<el-radio :label="1" :key="1" style="margin-right:5px"> 显示
																										</el-radio>
																										<el-radio :label="2" :key="2" style="margin-right:5px"> 编辑
																										</el-radio>
																								</el-radio-group>
																						</el-form-item>
																				</el-tab-pane>
																		</el-tabs>
																</el-form>
																<!--<el-button type="primary" @click="changeItem" size="small">确认修改</el-button>-->
														</div>
												</div>
										</el-main>
										<el-footer class="footer">
										</el-footer>
								</el-container>
						</el-container>
				</el-container>

		</div>
</template>

<script>
    import {deepClone} from '@/utils'
    import draggable from 'vuedraggable'
    import Sticky from '@/components/Sticky'
    import G6 from '@antv/g6';
    import ElDragSelect from '@/components/DragSelect' // base on element-ui
    import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
    import {getFieldList} from '@/api/workflow/workflow';
    import {getNodeTempList, saveNodeTemp, publishNode} from '@/api/workflow/node';
    import {getUserAllList} from '@/api/user';


    const defaultNodeRow = {
        id: '',
        label: '',
        x: 0,
        y: 0,
        node_id: 0,
        size: 100,
        field: [],
        user: [],
        anchorPoints: [
            [0.5, 0],  //上
            [0.5, 1],  //下
		        [0,0.5],
		        [1,0.5],
        ],
    }
    // 基础数据
    const defaultNodeData = {
        id: 'g0',
        label: "发起",
        x: 400,
        y: 100,
        size: 60,
        node_type: 'start',
        type: 'circle',
        style: {
            stroke: '#6c20ff',
            fill: '#eedeff',
        },
        anchorPoints: [
            [0.5, 1]  //下
        ],
    }
    export default {
        name: "g6Editor",
        directives: {elDragDialog},
        components: {draggable, Sticky, G6, ElDragSelect},
        data() {
            return {
                row_index: -1,
                loading: false,
                activeName: "1",
                fieldList: [],
                anchorPoints: [
                    [0.5, 0],  //上
                    [0.5, 1]  //下
                ],
                node_styles: {
                    review: {
                        node_type: "review",
                        size: [100, 40],
                        style: {
                            stroke: '#1890ff',
                            fill: '#e8f8ff',
                            radius: 5
                        },
                    },
                    task: {
                        node_type: "task",
                        size: [100, 40],
                        style: {
                            stroke: '#b37feb',
                            fill: '#f9f1ff',
                            radius: 5
                        },
                    },
                    suspend: {
                        node_type: "suspend",
                        size: [100, 40],
                        style: {
                            stroke: '#ffc069',
                            fill: '#fff3ea',
                            radius: 20
                        },
                    }
                },
                itemListL: [
                    {
                        type: 'review',
                        label: '审批节点',
                        model: {
                            label: '审批节点',
                        }
                    },
                    {
                        type: 'task',
                        label: '任务节点',
                        model: {
                            label: '任务节点',
                        }
                    },
                    {
                        type: 'suspend',
                        label: '阻塞节点',
                        model: {
                            label: '阻塞节点',
                        }
                    }
                ],
                users: [],
                nodeData: {
                    nodes: [],
                    edges: []
                },
                graph: '',
                graph_id: '',
                graph_lable: '',
                graph_type: '',
                graph_field: [],
                graph_user: [],
                addingEdge: null,
                edge: null,
                isDrag: false,
            }
        },
        created() {
            this.id = this.$route.params.id
            this.getUserAllList()
            this.getFieldList(this.id)
            this.getNodeDataList(this.id)
        },
        methods: {
            async getUserAllList() {
                const res = await getUserAllList()
                this.users = res.data
            },
            async getFieldList(id) {
                let fieldList = []
                const res = await getFieldList(id)
                res.data.forEach(function(field){
                    fieldList.push(Object.assign({},field,{state:0}))
                })
                this.fieldList = fieldList
            },
            async getNodeDataList(id) {
                const res = await getNodeTempList(id)
		            this.setResponseNodeData(res.data)
            },
            //保存
            async draftForm() {
                let nodes = []
                this.loading = true
                const node_data = this.getGraphData()
                node_data.nodes.splice(0, 1)
                node_data.nodes.forEach(function (node) {
                    let source = []
                    node_data.edges.forEach(function (edge) {
                        if (node.id === edge.target) {
                            source.push(edge.source)
                        }
                    })
                    nodes.push({
                        id: node.node_id,
		                    target:node.id,
                        source:source,
                        node_name: node.label,
                        node_type: node.node_type,
                        field: node.field,
                        user: node.user,
                        extend_data: {id: node.id, x: node.x, y: node.y}
                    })
                })
                const res = await saveNodeTemp(this.id, nodes)
                this.setResponseNodeData(res.data)
                this.$message({
                    message: '保存成功',
                    type: 'success',
                    showClose: true,
                    duration: 1000
                })
                this.loading = false
            },
            async publishForm() {
                await publishNode(this.id)
                this.loading = true
                this.$message({
                    message: '发布成功',
                    type: 'success',
                    showClose: true,
                    duration: 1000
                })
                this.loading = false
            },
		        //返回数据重新生成
            setResponseNodeData(nodes) {
                let node_styles = this.node_styles
                let nodeData = {nodes: [defaultNodeData], edges: []}
                const fieldList = this.fieldList
                nodes.forEach(function(node){
                    let extend_data = JSON.parse(node.extend_data)
		                let field_states = []
		                let node_field= []
                    JSON.parse(node.field).forEach(function(field){
                        field_states[field.id] = field.state
                    })
                    fieldList.forEach(function(field){
		                    if(field_states[field.id]){
                            node_field.push(Object.assign({},field,{state:field_states[field.id]}))
		                    }else{
                            node_field.push(field)
		                    }

                    })
                    nodeData.nodes.push(Object.assign({},defaultNodeRow,node_styles[node.node_type],{
                        id:node.target,
                        x:extend_data.x,
                        y:extend_data.y,
                        label:node.node_name,
                        node_id:node.id,
                        node_type:node.node_type,
                        field:node_field,
                        user:JSON.parse(node.user),
                    }))
		                JSON.parse(node.source).forEach(function(source){
                        nodeData.edges.push({source:source,target:node.target})
		                })
                })
                this.graph.data(nodeData)
                this.graph.render()
            },
            delItem() {
                const item = this.graph.findById(this.graph_id)
                this.graph.removeItem(item)
            },
            changeItem() {
                const item = this.graph.findById(this.graph_id)
                let model = item._cfg.model
                model.label = this.graph_lable
                model.field = this.graph_field
                this.graph.updateItem(item, model)
                this.redrawGraph()
            },
            changeNodeUser() {
                const item = this.graph.findById(this.graph_id)
                let model = item._cfg.model
                model.label = this.graph_lable
                model.user = this.graph_user
                this.graph.updateItem(item, model)
            },
            redrawGraph() {
                const nodeData = this.getGraphData()
                this.graph.data(nodeData)
                this.graph.render()
            },
            getGraphData() {
                let nodeData = {nodes: [], edges: []}
                this.graph.getNodes().forEach(function (node) {
                    nodeData.nodes.push(node.getModel())
                })
                this.graph.getEdges().forEach(function (edge) {
                    nodeData.edges.push(edge.getModel())
                })
                return nodeData
            },
            dragStart(index) {
                this.row_index = index
                console.log(this.row_index, 'dragStart....')
            },
            dragStop(e) {
                this.row_index = -1
                console.log(e, 'dragStop....')
            },
            dragEnd(e) {
                if (this.row_index >= 0) {
                    const index = this.row_index
                    this.row_index = -1
                    let x = e.layerX - 200
                    let y = e.layerY
                    if (x < 0 || x > 700 || y < 0) {
                        return false
                    }
                    this.getG6Id()
                    const itemL = this.itemListL[index]
                    const _index_model = Object.assign({}, defaultNodeRow, this.node_styles[itemL.type], itemL.model)
                    Object.assign(_index_model, {x: x, y: y, id: this.getG6Id()})
                    this.nodeData.nodes.push(_index_model)
                    let model = JSON.parse(JSON.stringify(_index_model))
                    this.fieldList.forEach(function (field) {
                        model.field.push({id: field.id, field_name: field.field_name, state: 1})
                    })
                    this.graph.addItem('node', model)
                }
            },
		        getG6Id(){
                const id = G6.Util.uniqueId()
				        if(this.graph.findById(id)){
				            return this.getG6Id()
				        }
				        return id
		        },
            onDrag() {
                this.isDrag = !this.isDrag
            },
            //判断edge是否可以添加
            checkAddEdge(source, target) {
                let state = true
                if (source === target) {
                    state = false
                } else {
                    this.graph.getEdges().forEach(function (edge) {
                        let model = edge.getModel()
                        if (model.target === source) {
                            if (model.source === target) {
                                state = false
                            }
                        } else if (model.source === source) {
                            if (model.target === target) {
                                state = false
                            }
                        }
                        return false
                    })
                }
                return state
            },
            addEdgeData(source, target) {
                if (this.checkAddEdge(source, target)) {
                    this.nodeData.edges.push({
                        source: source,
                        target: target,
                    });
                    return true
                }
                return false
            },
        },
        mounted() {
            let _this = this
            G6.registerBehavior('click-add-edge', {
                getEvents() {
                    return {
                        'node:click': 'onClick',
                        mousemove: 'onMousemove',
                        'edge:click': 'onEdgeClick' // 点击空白处，取消边
                    };
                },
                onClick(ev) {
                    const node = ev.item;
                    const graph = this.graph;
                    const point = {
                        x: ev.x,
                        y: ev.y
                    };
                    const model = node.getModel();
                    if (_this.addingEdge && this.edge) {
                        const source = this.edge.get("source").get("id")
                        //连线自己 取消
                        if (!_this.checkAddEdge(source, model.id)) {
                            return false
                        }
                        graph.updateItem(this.edge, {
                            target: model.id
                        });
                        this.edge = null;
                        _this.addingEdge = false;
                    } else if (_this.isDrag) {
                        //获取所有锚点
                        //const anchor = node.getAnchorPoints();
                        // const anchor = node.getLinkPoint(point);
                        this.edge = graph.addItem('edge', {
                            source: model.id,
                            target: point
                        });
                        _this.addingEdge = true;
                    }
                },
                onMousemove(ev) {
                    const point = {
                        x: ev.x,
                        y: ev.y
                    };
                    if (_this.addingEdge && this.edge) {
                        this.graph.updateItem(this.edge, {
                            target: point
                        });
                    }
                },
                onEdgeClick(ev) {
                    console.log('click-add-edge[onEdgeClick]')
                    const currentEdge = ev.item
                    // 拖拽过程中，点击会点击到新增的边上
                    if (_this.addingEdge && this.edge === currentEdge) {
                        this.graph.removeItem(this.edge)
                        this.edge = null
                        _this.addingEdge = false
                    }
                }
            })
            G6.registerBehavior('activate-node', {
                getDefaultCfg() {
                    return {
                        multiple: false
                    };
                },
                getEvents() {
                    console.log('activate-node[getEvents]')
                    return {
                        'node:click': 'onNodeClick',
                        'canvas:click': 'onCanvasClick'
                    };
                },
                onNodeClick(e) {
                    const graph = _this.graph;
                    const item = e.item;
                    if (!this.multiple) {
                        this.removeNodesState();
                    }
                    document.getElementById("setting-right-box").style.width = "0"
                    if (item._cfg.id === 'g0') {
                        return false
                    }
                    // 置点击的节点状态为active
                    _this.graph_id = item._cfg.id;
                    _this.graph_lable = item._cfg.model.label;
                    _this.graph_type = item._cfg.type;
                    _this.graph_field = item._cfg.model.field;
                    _this.graph_user = item._cfg.model.user;
                    graph.setItemState(item, 'active', true);
                    document.getElementById("setting-right-box").style.width = "0"
                    _this.activeName ="1"
                    document.getElementById("setting-right-box").style.width = "300px"

                },
                onCanvasClick(e) {
                    // shouldUpdate可以由用户复写，返回 true 时取消所有节点的active状态
                    if (this.shouldUpdate(e)) {
                        this.removeNodesState();
                    }
                    document.getElementById("setting-right-box").style.width = "0"
                },
                removeNodesState() {
                    _this.graph_id = '';
                    _this.graph_lable = '';
                    _this.graph_type = '';
                    _this.graph.findAllByState('node', 'active').forEach(node => {
                        _this.graph.setItemState(node, 'active', false);
                    });
                    _this.graph.findAllByState('node', 'selected').forEach(node => {
                        _this.graph.setItemState(node, "selected", false);
                    });
                },
            })
            const contextMenu = new G6.Menu({
                getContent(evt) {
                    //g6-component-contextmenu
                    if (evt.name === 'edge-shape:contextmenu') {
                        return '<a data-type="edge">删除连线</a>';
                    } else if (evt.name === 'text-shape:contextmenu') {
                        return '<a data-type="node">删除节点</a>';
                    }
                    return '<a data-type="node" >删除节点</a>';
                },
                shouldBegin(evt) {
                    if (_this.isDrag) {
                        return false
                    } else if (_this.addingEdge) {
                        return false
                    } else if (evt.name === 'edge-shape:contextmenu') {
                        //连线未连接
                        if (evt.item.getModel().targetNode === null) {
                            return false
                        }
                    } else if (evt.item._cfg.id && evt.item._cfg.id === 'g0') {
                        return false
                    }
                    return true
                },
                handleMenuClick: (target, item) => {
                    this.graph.removeItem(item)
                },
                // offsetX and offsetY include the padding of the parent container
                // 需要加上父级容器的 padding-left 16 与自身偏移量 10
                offsetX: 16 + 10,
                // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
                offsetY: 0,
                // the types of items that allow the menu show up
                // 在哪些类型的元素上响应 'node', 'edge', 'canvas'
                itemTypes: ['node', 'edge'],
            });
            const graph = new G6.Graph({
                container: 'canvasBox',
                width: 900,
                height: 1000,
                plugins: [contextMenu],
                modes: {
                    default: [
                        //'zoom-canvas',  //放大缩小
                        'drag-canvas',
                        'click-add-node',
                        'click-select',
                        'click-add-edge',
                        'drag-node',
                        'activate-node',
                        'keyboard',
                        'select-node'
                    ], //'click-add-edge' 新增先的behiver
                },
                defaultNode: {
                    type: 'rect',
                    size: [100, 50],
                },
                defaultEdge: {
                    size: 3,
                    endArrow: true,
                    connector: {name: 'rounded'},
                    style: {
                        endArrow: 'custom-arrow',
                    }
                },
                edgeStyle: {
                    default: {
                        stroke: '#aaa',
                        endArrow: true
                    }
                },
            });

            graph.data(this.nodeData)
            graph.render()
            graph.setMode('node')

            this.graph = graph
            graph.on('keydown', function (ev) {
                if (ev.key === 'Control' && !_this.isDrag) {
                    _this.isDrag = true
                    console.log("开始连线", _this.isDrag)
                }
            });
            graph.on('keyup', function (ev) {
                if (ev.key === 'Control') {
                    _this.isDrag = false
                    console.log("连线连线结束", _this.isDrag)
                }
            });
        }
    }
</script>

<style scoped lang="scss">
		.header-box {
				background: beige;
		}

		.footer {
				background: beige;
		}

		.main-box {
				padding: 0;
				width: auto;
				height: 100%;
		}

		.info-box {
				float: right;
				width: 0;
				height: 100%;
				background: #fafafa;
				border-left: 1px solid #e8e8e8;
				transition: all .8s;
		}

		.center-box {
				float: left;
				width: -webkit-calc(100% - 300px);
				width: -moz-calc(100% - 300px);
				width: calc(100% - 300px);
				overflow-x: hidden;
		}

		.item-box {
				background: #fafafa;
				border-right: 1px solid #e8e8e8;
		}

		.nav-box {
				margin-top: 20px;
				text-align: center;
				width: auto;
		}

		.getItem {
				width: 100px;
				height: 50px;
				line-height: 50px;
				border-width: 1px;
				border-style: solid;
				-webkit-border-radius: 10px;
				-moz-border-radius: 10px;
				border-radius: 10px;
		}

		/*右侧内容样式*/
		.tab-box {
				width: 100%;
				height: 400px;
		}

		.show-box {
				width: 100%;
				height: 200px;
				border-top: 1px solid #e8e8e8;
				padding: 10px 0;
		}

		/** 右侧tab样式*/
		.tab-title {
				float: left;
				width: 30px;
				height: 400px;
				border-right: 1px solid #e8e8e8;
		}

		.tab-item {
				float: left;
				width: 265px;
				height: 400px;
		}

		.tab-item-title {
				width: 30px;
				text-align: center;
				font-size: 16px;
				color: #666;
				padding: 10px 0;
				cursor: pointer;
				border-bottom: 1px solid #e8e8e8;
				transition: all .8s;
		}

		.tab-active {
				background: #409eff;
				color: #fff;
		}

		.tab-item-content {
				width: auto;
				height: 300px;
				overflow-y: auto;
		}

		.search-box {
				width: auto;
				height: 50px;
				line-height: 50px;

		}

		.check-btn {
				width: auto;
				height: 50px;
				line-height: 50px;
				text-align: center;
		}

		.permission-list {
				width: auto;
				padding: 5px;
				background: #fff;
				margin-top: 2px;
				cursor: pointer;
		}

		.permission-list:hover {
				background: #cbe2fa;
		}

		.permission-list:active {
				background: #cbe2fa;
		}

		.permission-list-active {
				background: #cbe2fa
		}

		#g6-contextmenu {
				margin: 0px;
				width: 200px;
				background: white;
				box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
				color: #000;
				font-size: 12px;
				display: none;
		}

		#g6-contextmenu .command {
				height: 12px;
				padding: 8px;
				box-sizing: content-box;
		}

		#g6-contextmenu .command:hover {
				cursor: pointer;
				background: #E6F7FF;
		}

		#g6-contextmenu .disable {
				color: rgba(0, 0, 0, 0.25);
		}

		#g6-contextmenu span:nth-of-type(1) {
				float: left;
		}

		#g6-contextmenu span:nth-of-type(2) {
				float: right;
		}

		.node_start {
				background: #e8f8ff;
				border-color: #1890ff
		}

		.node_review {
				background: #e8f8ff;
				border-color: #1890ff
		}

		.node_task {
				background: #f9f1ff;
				border-color: #b37feb;
				//border-radius: 25px;
		}

		.node_suspend {
				background: #fff3ea;
				border-color: #ffc069;
				border-radius: 50px;
		}

		.node_end {
				background: #e8f8ff;
				border-color: #1890ff
		}
</style>
