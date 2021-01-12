<template>
    <div style="height: 100%">
        <el-container style="height: 100%">
            <el-header class="header-box">Header</el-header>
            <el-container style="height: 100%;">
                <el-aside width="200px" class="item-box">

                    <div class="nav-box" v-for="(item,index) in itemListL" :key="index" @click="checkItem(index)">
                        <img draggable="false" :src="item.src" class="getItem" :label="item.label">
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
                                <el-button type="danger" style="margin-left: 15px" @click="delItem" size="small">删除选中</el-button>
                            </div>
                        </div>


                    </el-main>
                    <el-footer class="footer">
                        <div id="g6-contextmenu" style="position: absolute; z-index: 2; top: 113px; left: 701px;display:none;">
                            <div data-status="node-selected" class="menu" style="display: none;">
                                <!--<div data-command="copy" class="command">-->
                                    <!--<span>复制</span><span>copy</span>-->
                                <!--</div>-->
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
    import G6 from '@antv/g6';



    export default {
        name: "g6Editor",
        data() {
            return {
                itemListL: [{
                    type: 'node',
                    src: 'https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg',
                    label: '起止节点',
                    model: {
                        id: '',
                        x: 300,
                        y: 200,
                        size: 60,
                        label: '起止节点',
                        shape: 'circle',
                        style: {
                            stroke: '#ffc069',
                            fill: '#fff3ea'
                        }
                    }
                },
                    {
                        type: 'node',
                        src: 'https://gw.alipayobjects.com/zos/rmsportal/wHcJakkCXDrUUlNkNzSy.svg',
                        label: '常规节点',
                        model: {
                            id: '',
                            x: 300,
                            y: 200,
                            size: [70, 40],
                            label: '常规节点',
                            shape: 'rect',

                            style: {
                                stroke: '#1890ff',
                                fill: '#e8f8ff',
                                radius: 5
                            }
                        }
                    },
                    {
                        type: 'node',
                        src: 'https://gw.alipayobjects.com/zos/rmsportal/SnWIktArriZRWdGCnGfK.svg',
                        label: '分叉节点',
                        model: {
                            id: '',
                            x: 300,
                            y: 200,
                            size: [60, 60],
                            label: '分叉节点',
                            shape: 'diamond',
                        }
                    },
                    {
                        type: 'node',
                        src: 'https://gw.alipayobjects.com/zos/rmsportal/rQMUhHHSqwYsPwjXxcfP.svg',
                        label: '模型节点',
                        model: {
                            id: '',
                            x: 300,
                            y: 200,
                            size: [70, 40],
                            label: '模型节点',
                            shape: 'rect',
                            style: {
                                stroke: '#b37feb',
                                fill: '#f9f1ff',
                                radius: 5
                            }
                        }
                    },
                ],
                nodeData: {
                    nodes: [{
                        id: '1',
                        label: 'node1',
                        x: 100,
                        y: 200,
                        size:[80,40],
                        anchorPoints: [
                            [0, 1],
                            [0.5, 1]
                        ],
                        shape: 'rect'
                    }, ],
                    edges: []
                },
                graph: '',
                graph_id: '',
                graph_lable: '',
                graph_type: '',

                tabList: [{
                    title: '资源配置',
                    content: [{
                        text: '资产数据表',
                        field: [{
                            key: 'id',
                            text: '序号'
                        }]
                    }],
                    contentActive: 0
                }],
                tabActive: 1,

                searchTableData: '',
                defaultProps: {
                    children: 'field',
                    label: 'text'
                },

                permissionTabActive: 0,
            }
        },
        watch: {
            searchTableData(val) {
                console.log(val)
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            delItem() {
                const item = this.graph.findById(this.graph_id)
                this.graph.removeItem(item)
            },
            changeItem() {
                console.log("changeItem");
                console.log(this.graph_id);
                console.log(this.graph_lable);
                const item = this.graph.findById(this.graph_id)
                let model = item._cfg.model

                const autoPaint = this.graph.get('autoPaint');
                this.graph.setAutoPaint(false);
                model.label = this.graph_lable
                this.graph.updateItem(item, model)
                this.graph.paint();
                this.graph.setAutoPaint(autoPaint);
                console.log(this.graph.getStackData())

            },
            checkItem(_index) {
                console.log("checkItem");
                console.log(_index);
                this.itemListL[_index].model.id = G6.Util.uniqueId()
                let model = JSON.parse(JSON.stringify(this.itemListL[_index].model))
                this.graph.addItem('node', model)
                this.graph.refresh();
            },

            searchtable() {

            },
            filterNode(value, data) {
                console.log('111')
                console.log(value)
                console.log(data)
                if (!value) return true;
                return data.text.indexOf(value) !== -1;
            },

            saveBtn() {
                console.log(this.nodeData)
                console.log(this.graph)
            }
        },
        mounted() {

            let _this = this
            console.log(document.body.clientWidth)
            G6.registerNode('diamond', {
                draw(cfg, group) {
                    const size = cfg.size || [60, 60]; // 如果没有 size 时的默认大小
                    const width = size[0];
                    const height = size[1];
                    console.log('222222')
                    console.log(cfg)
                    const shape = group.addShape('path', {
                        attrs: {
                            //  / 1 \
                            // 4     2
                            //  \ 3 /
                            // path中的M、L等是SVG中的概念
                            path: [
                                ['M', 0, 0 - height / 2], // 上部顶点
                                ['L', width / 2, 0], // 右侧点
                                ['L', 0, height / 2], // 下部
                                ['L', -width / 2, 0], // 左侧
                                ['Z'] // 封闭
                            ],

                            getAnchorPoints() {
                                return [
                                    [0, 0, {
                                        type: 'circle',
                                        style: {
                                            stroke: 'red',
                                            fill: 'white'
                                        }
                                    }],
                                    [0.5, 0, {
                                        type: 'circle',
                                        style: {
                                            stroke: 'red',
                                            fill: 'white'
                                        }
                                    }],
                                    [1, 0, {
                                        type: 'circle',
                                        style: {
                                            stroke: 'red',
                                            fill: 'white'
                                        }
                                    }],
                                    [1, 1, {
                                        type: 'circle',
                                        style: {
                                            stroke: 'red',
                                            fill: 'white'
                                        }
                                    }],
                                ]
                            },

                            stroke: '#5cdbd3', // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
                            fill: '#e8fffb',
                            radius: 5,
                        }
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
                    console.log('click-add-edge[getEvents]')
                    return {
                        'node:click': 'onClick',
                        mousemove: 'onMousemove',
                        'edge:click': 'onEdgeClick' // 点击空白处，取消边
                    };
                },
                onClick(ev) {
                    //console.log('click-add-edge[onClick]')
                    return true
                    const node = ev.item;
                    const graph = this.graph;
                    const point = {
                        x: ev.x,
                        y: ev.y
                    };
                    const model = node.getModel();
                    if (this.addingEdge && this.edge) {
                        graph.updateItem(this.edge, {
                            target: model.id
                        });

                        this.edge = null;
                        this.addingEdge = false;
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
                    // 拖拽过程中，点击会点击到新增的边上
                    if (this.addingEdge && this.edge == currentEdge) {
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
                    const graph = this.graph;
                    const item = e.item;
                    // console.log(_this.nodeData)
                    // if(item._cfg.model.id == '1'){
                    //     _this.graph_id = item._cfg.id;
                    //     _this.graph_lable = item._cfg.model.label;
                    //     _this.graph_type = item._cfg.type;
                    // }
                    // return true
                    if (item.hasState('active')) {
                        //_this.graph_lable = item._cfg.model.label;
                        graph.setItemState(item, 'active', false);
                        return;
                    }
                    console.log('22222222')
                    // this 上即可取到配置，如果不允许多个active，先取消其他节点的active状态
                    if (!this.multiple) {
                       // this.removeNodesState();
                    }
                    // 置点击的节点状态为active
                    _this.graph_id = item._cfg.id;
                    _this.graph_lable = item._cfg.model.label;
                    _this.graph_type = item._cfg.type;
                    //console.log(graph)
                    const autoPaint = graph.get('autoPaint');
                    //console.log(autoPaint)
                    graph.setAutoPaint(false);
                    graph.setItemState(item, 'active', true);
                    graph.paint();
                    graph.setAutoPaint(autoPaint);

                },
                onCanvasClick(e) {
                    // shouldUpdate可以由用户复写，返回 true 时取消所有节点的active状态
                    console.log('activate-node[onCanvasClick]')

                    // if (this.shouldUpdate(e)) {
                    //     this.removeNodesState();
                    // }
                },
                removeNodesState() {
                    console.log('removeNodesState')
                    _this.graph_id = '';
                    _this.graph_lable = '';
                    _this.graph_type = '';
                    _this.graph.findAllByState('node','active').forEach(node => {
                        console.log('removeNodesState - setItemState')
                        //this.graph.setItemState(node, 'active', false);
                    });
                }
            })

            const graph = new G6.Graph({
                container: 'canvasBox',
                width: document.body.clientWidth - 540,
                height: document.body.clientHeight - 140,
                modes: {
                    default: [
                        'zoom-canvas',
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
                defaultEdge: {
                    shape: 'rect',
                    size: 3,
                    endArrow: true,
                    connector: { name: 'rounded' },
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

            var menu = document.getElementById('g6-contextmenu');
            graph.on('node:contextmenu', function(evt) {
                evt.preventDefault();
                menu.style.left = evt.x+200 + 'px';
                menu.style.top = evt.y+60 + 'px';
                menu.style.display = 'block';
                menu.getElementsByClassName("menu").forEach(e=>{
                    if(e.dataset.status == "node-selected"){
                        e.getElementsByTagName("div").forEach(ee=>{
                            ee.classList.remove("disable")
                        });
                        e.style.display = 'block';
                    }
                });

                //menu.style.visibility = "visible";
            });
            graph.on('node:mousedown', function(evt) {
                menu.style.display = 'none';
                menu.getElementsByClassName("menu").forEach(e=>{
                    if(e.dataset.status == "node-selected"){
                        e.getElementsByTagName("div").forEach(ee=>{
                            ee.classList.add("disable")
                        });
                        e.style.display = 'none';
                    }
                });
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
        width: 300px;
        height: 100%;
        background: #fafafa;
        border-left: 1px solid #e8e8e8;
    }

    .center-box {
        float: left;
        width:-webkit-calc(100% - 300px);
        width:-moz-calc(100% - 300px);
        width:calc(100% - 300px);
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
        box-shadow: 0px 1px 4px rgba(0,0,0,0.25);
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
        color: rgba(0,0,0,0.25);
    }
    #g6-contextmenu span:nth-of-type(1) {
        float: left;
    }
    #g6-contextmenu span:nth-of-type(2) {
        float: right;
    }
</style>
