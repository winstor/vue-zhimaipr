<template>
		<div class="center-box">
				<div id="canvasBox" ref="canvasBox"></div>
		</div>
</template>

<script>
    import G6 from '@antv/g6';

    export default {
        name: "test",
        components: {G6},
        data() {
            return {
                nodeData:{
                    nodes: [
                        {
		                        type:'rect',
                            id: 'node1',
                            label: 'rect',
                            x: 150,
                            y: 150,
		                        size:[100,50],
                            style: {
                                stroke: '#1890ff',
                                fill: '#e8f8ff',
                                radius: 5
                            },
		                        stateStyles: {
                                stroke: '#1890ff',
                                fill: '#e8f8ff',
		                        }
                        },
                        {
                            type:'circle',
                            id: 'node2',
                            label: 'Circle2',
                            x: 400,
                            y: 150,
                            size:80,

                        }, {
                            type:'circle',
                            id: 'node3',
                            label: 'Circle3',
                            x: 500,
                            y: 250,
                            size:80,

                        },
                    ],
                    edges: [
                        {
                            source: 'node1',
                            target: 'node2',
                        },
                    ],
                },
                graph:''
            }
        },
        mounted() {
            let _this = this
            const graph = new G6.Graph({
                container: 'canvasBox',
                width: 800,
                height: 500,
                modes: {
                    default: [
                        //'zoom-canvas',  放大缩小
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
                    type: 'circle',
                    color: '#5B8FF9',
                    style: {
                        fill: '#9EC9FF',
                        lineWidth: 3,
                    },
                    labelCfg: {
                        style: {
                            fill: '#fff',
                            fontSize: 20,
                        },
                    },
                },
                defaultEdge: {
                    style: {
                        stroke: '#e2e2e2',
                    },
                },
            });
            // graph.node(node=>{
            //     console.log(node)
		        //     if(node.id == 'node1'){
            //         return {
            //             type:'rect',
		        //             label:'ttt'
            //         }
		        //     }else{
		        //         return {}
		        //     }
            // })
            graph.data(this.nodeData);
            graph.render();
        }
    }
</script>

<style scoped>

</style>