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

										<div class="nav-box" v-for="(item,index) in itemListL" :key="index" @click="checkItem(index)" style="padding: 0 25px">
												<div  draggable="true"  class="getItem" :style="item.style" @mouseout="dragEnd" @mousedown="dragStart(index)" @mouseup="dragStop">
														{{item.label}}
												</div>
										</div>

										<div class=" nav-box">
												<el-button type="primary" size="small" @click="saveBtn"> 提交数据</el-button>
										</div>
								</el-aside>
								<el-container>
										<el-main class="main-box">
												<div class="center-box">
														<div id="canvasBox" ref="canvasBox"></div>
												</div>

												<div class="info-box">
														<div class="show-box">
																<el-form ref="form" label-width="80px">
																		<el-form-item label="修改值">
																				<el-input v-model="graph_lable"></el-input>
																		</el-form-item>
																</el-form>
																<el-button type="primary" @click="changeItem" size="small">确认修改</el-button>
																<el-button type="danger" style="margin-left: 15px" @click="delItem" size="small">删除选中
																</el-button>
														</div>
												</div>
										</el-main>
										<el-footer class="footer">
												<div id="g6-contextmenu"
												     style="position: absolute; z-index: 2; top: 113px; left: 701px;display:none;">
														<div data-status="node-selected" class="menu" style="display: none;">
																<div data-command="delete" class="command disable">
																		<span>删除</span>
																		<span>delete</span>
																</div>
														</div>
														<div data-status="edge-selected" class="menu" style="display: none;">
																<div data-command="delete" class="command disable">
																		<span>删除</span><span>delete</span>
																</div>
														</div>
												</div>
										</el-footer>
								</el-container>
						</el-container>
				</el-container>

		</div>
</template>

<script>
    import {deepClone} from '@/utils'
    import draggable from 'vuedraggable'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import G6 from '@antv/g6';

    const defaultNodeRow = {
        id: '',
        label: '',
        x: 0,
        y: 0,
        size: 60,
        shape: '',
        style: {}
    }
    export default {
        name: "g6Editor",
        components: {draggable, Sticky, G6},
        data() {
            return {
                row_index:-1,
                loading: false,
                itemListL: [
                    {
                        type: 'node',
                        src: 'https://gw.alipayobjects.com/zos/rmsportal/wHcJakkCXDrUUlNkNzSy.svg',
                        label: '审批节点',
                        style:{
                            background: "#e8f8ff",
                            borderColor:"#1890ff"
                        },
                        model: {
                            id: '',
                            x: 300,
                            y: 200,
                            size: [70, 40],
                            label: '审批节点',
                            type: 'rect',
                            style: {
                                stroke: '#1890ff',
                                fill: '#e8f8ff',
                                radius: 5
                            },
                            anchorPoints: [
                                [0.5, 0],  //上
                                [0.5, 1]  //下
                            ],
                        }
                    },
                    {
                        type: 'node',
                        src: 'https://gw.alipayobjects.com/zos/rmsportal/rQMUhHHSqwYsPwjXxcfP.svg',
                        label: '任务节点',
                        style:{
                            background: "#f9f1ff",
                            borderColor:"#b37feb",
                            borderRadius:"25px",
                        },
                        model: {
                            id: '',
                            x: 300,
                            y: 200,
                            size: [100, 50],
                            label: '任务节点',
                            type: 'rect',
                            style: {
                                stroke: '#b37feb',
                                fill: '#f9f1ff',
                                radius: 25
                            },
                            anchorPoints: [
                                [0.5, 0],  //上
                                [0.5, 1]  //下
                            ],
                        }
                    },{
                        type: 'node',
                        src: 'https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg',
                        label: '阻塞节点',
                        style:{
                            background: "#fff3ea",
                            borderColor:"#ffc069",
                            borderRadius:"50px",
                        },
                        model: {
                            id: '',
                            x: 300,
                            y: 200,
                            size: [60,40],
                            label: '阻塞节点',
                            shape: 'circle',
                            type: 'rect',
                            style: {
                                stroke: '#ffc069',
                                fill: '#fff3ea',
                                radius: 10
                            },
                            anchorPoints: [
                                [0.5, 0],  //上
                                [0.5, 1]  //下
                            ],
                        }
                    }
                ],
                nodeData: {
                    nodes: [{
                        id: 'id0',
                        label: "起始",
                        x: 400,
                        y: 100,
                        size: 70,
		                    type:'circle',
                        color: "#FF9D2D",
                        style: {
                            stroke: '#6c20ff',
                            fill: '#eedeff'
                        },
                        stateStyles:{
                            stroke: '#6c20ff',
                            fill: '#eedeff',
                            shadowColor:'#6c20ff'
                        },
                        linkPoints: {
                            top: true,
                            right: true,
                            bottom: true,
                            left: true,
                            /* linkPoints' size, 8 by default */
                            //   size: 5,
                            /* linkPoints' style */
                            //   fill: '#ccc',
                            //   stroke: '#333',
                            //   lineWidth: 2,
                        },
                        anchorPoints: [
                            // [0.5, 0],  //上
                            [0.5, 1]  //下
                        ],
                    }],
                    edges: []
                },
                graph: '',
                graph_id: '',
                graph_lable: '',
                graph_type: '',
            }
        },
        watch: {
            searchTableData(val) {
                console.log("1111111111111111111111111111111111111111111-searchTableData")
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            delItem() {
                const item = this.graph.findById(this.graph_id)
                this.graph.removeItem(item)
            },
            changeItem() {
                const item = this.graph.findById(this.graph_id)
                let model = item._cfg.model
                model.label = this.graph_lable
                this.graph.updateItem(item, {
                    label:this.graph_lable,
                    style: {
                        stroke: 'red'
                    }
                })
                this.nodeData.nodes.forEach(function (item) {
                    console.log(model.id)
                    if (item.id === model.id) {
                        item.label = model.label
                    }
                })
            },
            checkItem(_index) {
                return false
                this.itemListL[_index].model.id = G6.Util.uniqueId()
                const _index_model = this.itemListL[_index].model
                this.nodeData.nodes.push(_index_model)
                let model = JSON.parse(JSON.stringify(_index_model))
                this.graph.addItem('node', model)

            },
            filterNode(value, data) {
                console.log('1111111111111111111111111-filterNode')
                if (!value) return true;
                return data.text.indexOf(value) !== -1;
            },

            saveBtn() {
                console.log(this.nodeData)
                console.log(this.graph)
            },
            draftForm() {
            },
            publishForm() {
            },
            onMove(e) {
                console.log(e, 'checkMove....')
                // return false
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
                if(this.row_index >= 0){
                    const index = this.row_index
                    this.row_index = -1
                    let x = e.layerX-200
		                let y = e.layerY
		                if(x<0 || x >700 || y < 0){
											return false
		                }
                    let _index_model = Object.assign({},defaultNodeRow,this.itemListL[index].model,{id:G6.Util.uniqueId()})
                    Object.assign(_index_model,{x:x,y:y,id:G6.Util.uniqueId()})
                    this.nodeData.nodes.push(_index_model)
                    let model = JSON.parse(JSON.stringify(_index_model))
                    this.graph.addItem('node', model)
                    console.log(e, 'dragEnd....')
                }
            },

        },
        mounted() {

            let _this = this
            console.log(document.body.clientWidth)
            G6.registerNode('node', {
                draw(cfg, group) {
                    const size = cfg.size || [60, 60]; // 如果没有 size 时的默认大小
                    const width = size[0];
                    const height = size[1];
                    console.log('222222')
                    console.log(cfg)
                    const shape = group.addShape('circle', {
                        attrs: {
                            //  / 1 \
                            // 4     2
                            //  \ 3 /
                            // path中的M、L等是SVG中的概念



                            stroke: '#5cdbd3', // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
                            fill: '#e8fffb',
                            radius: 5,
                        },
                        name: 'circle-shape',
                    });
                    if (cfg.label) { // 如果有文本
                        // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
                        // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
                        // style.text = cfg.label;
                        group.addShape('text', {
                            // attrs: style
                            attrs: {
                                x: 0, // 居中
                                y: 0,
                                textAlign: 'center',
                                textBaseline: 'middle',
                                text: cfg.label,
                                fill: '#666'
                            }
                        });
                    }
                    return shape;
                }
            })
            G6.registerBehavior('click-add-edge', {
                getEvents() {
                    return {
                        'node:click': 'onClick',
                        mousemove: 'onMousemove',
                        'edge:click': 'onEdgeClick' // 点击空白处，取消边
                    };
                },
                onClick(ev) {
                    //console.log('click-add-edge[onClick]')
                    const node = ev.item;
                    const graph = this.graph;
                    const point = {
                        x: ev.x,
                        y: ev.y
                    };
                    const model = node.getModel();
                    if (this.addingEdge && this.edge) {
                        const source_id = this.edge.get("source").get("id")
                        //连线自己 取消
                        if(source_id === model.id){
                            return false
                        }
                        graph.updateItem(this.edge, {
                            target: model.id
                        });
                        this.edge = null;
                        this.addingEdge = false;
                        // _this.nodeData.edges.forEach(function (item, index) {
                        //     if (item.source == source_id && item.target == model.id) {
                        //         _this.nodeData.edges.splice(index, 1)
                        //     }
                        // })
                        // _this.nodeData.edges.push({
                        //     source: source_id,
                        //     target: model.id
                        // })
                       // console.log(_this.nodeData.edges)
                    } else {
                        this.edge = graph.addItem('edge', {
                            source: model.id,
                            target: point
                        });
                        this.addingEdge = true;
                    }
                },
                onMousemove(ev) {
                    //console.log('click-add-edge[onMousemove]')
                    const point = {
                        x: ev.x,
                        y: ev.y
                    };
                    if (this.addingEdge && this.edge) {
                        this.graph.updateItem(this.edge, {
                            target: point
                        });
                    }
                },
                onEdgeClick(ev) {
                    console.log('click-add-edge[onEdgeClick]')
                    const currentEdge = ev.item
                    console.log(this.graph.getEdges())
                    // 拖拽过程中，点击会点击到新增的边上
                    if (this.addingEdge && this.edge === currentEdge) {
                        this.graph.removeItem(this.edge)
                        this.edge = null
                        this.addingEdge = false
                    }
                }
            })
            // G6.registerNode('customNode', {
            //     anchor(item) {
            //         return [
            //             [0, 1, cfg],
            //             [0.5, 0.5, cfg]
            //         ];
            //     },
            // });
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
                    console.log('activate-node[onNodeClick]')
		                console.log(e)
                    const graph = this.graph;
                    const item = e.item;
                    // if (item.hasState('active')) {
                    //     graph.setItemState(item, 'active', false);
                    //     return;
                    // }
                    // this 上即可取到配置，如果不允许多个active，先取消其他节点的active状态
                    if (!this.multiple) {
                        this.removeNodesState();
                    }
                    // 置点击的节点状态为active
                    _this.graph_id = item._cfg.id;
                    _this.graph_lable = item._cfg.model.label;
                    _this.graph_type = item._cfg.type;
                    graph.setItemState(item, 'active', true);


                },
                onCanvasClick(e) {
                    // shouldUpdate可以由用户复写，返回 true 时取消所有节点的active状态
                    console.log('activate-node[onCanvasClick]')

                    if (this.shouldUpdate(e)) {
                        this.removeNodesState();
                    }
                },
                removeNodesState() {
                    console.log('removeNodesState')
                    _this.graph_id = '';
                    _this.graph_lable = '';
                    _this.graph_type = '';
                    _this.graph.findAllByState('node', 'active').forEach(node => {
                        console.log('removeNodesState - setItemState')
                        this.graph.setItemState(node, 'active', false);
                    });
                }
            })

            const graph = new G6.Graph({
                container: 'canvasBox',
                width: 770,
                height: 1000,
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
                    labelCfg: {
                        /* label's position, options: center, top, bottom, left, right */
                        position: 'center',
                        /* label's offset to the keyShape, 4 by default */
                        //   offset: 12,
                        /* label's style */
                        //   style: {
                        //     fontSize: 20,
                        //     fill: '#ccc',
                        //     fontWeight: 500
                        //   }
                    },
                    /* configurations for four linkpoints */
                    linkPoints: {
                        top: true,
                        right: true,
                        bottom: true,
                        left: true,
                        /* linkPoints' size, 8 by default */
                        //   size: 5,
                        /* linkPoints' style */
                        //   fill: '#ccc',
                        //   stroke: '#333',
                        //   lineWidth: 2,
                    },
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
            graph.on('circle-shape:click', (evt) => {
                console.log(111111111111)
                const { item } = evt;
                graph.updateItem(item, {
                    label: '点击了局部',
                    labelCfg: {
                        style: {
                            fill: '#003a8c',
                            fontSize: 16,
                        },
                    },
                });
            });
            // graph.on('edge:click', function(evt) {
            //     var target = evt.target;
            //     console.log(evt)
		        //     console.log(11111111111)
            //     console.log(target.get("type"))
            //     //var type = target.get('type');
            // });
            // graph.on('keydown', function(ev){
            //     console.log(ev)
            // });
            // graph.on('keyup', function(ev){
            //     console.log(ev)
            // });
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
				width: 300px;
				height: 100%;
				background: #fafafa;
				border-left: 1px solid #e8e8e8;
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
		.getItem{
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
</style>
