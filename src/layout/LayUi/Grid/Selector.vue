<template>
		<div class="grid-tabs">
				<ul style="width: 100%">
						<li class="title">{{label}}：</li>
						<li v-for="item in list" :class="tabActive == item.id ? 'active' :''" @click="handleClick(item.id)">
								<a>
										{{item.name}}
										<span v-if="item.count && item.count > 0"><i>{{item.count}}</i></span>
								</a>
						</li>
				</ul>
				<div style="clear:both;"></div>
		</div>
</template>

<script>
    export default {
        name: "Selector",
        props: {
            value:{
                type:Object,
		            default(){
                    return {}
		            }
            },
            active: {
                type: [String, Number],
                default: ''
            },
            label: {
                type: String,
                default: ''
            },
            prop:{
                type: String,
                default: ''
            },
            list: {
                type: Array,
                default() {
                    return []
                }
            },
        },
        computed: {
						query:{
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('update:value', val)
                }
						}
        },
        data() {
            return {
                tabActive: '',
            }
        },
        created() {

        },
        methods: {
            handleClick(id) {
                this.tabActive = id
		            if(id){
                    this.query[this.prop] = id
		            } else {
                    delete(this.query[this.prop])
		            }
                this.$emit('click')
            },
        }
    }
</script>

<style lang="scss" scoped>
		.grid-tabs {
				line-height: 40px;
				margin-bottom: 10px;
				width: 100%;
				border-bottom: 1px solid #ddd;
				font-size: 15px;
				& ul {
						list-style: none;
						margin: 0;
						padding: 0;
						& li.title {
								padding-left: 0;
								font-weight: 700;
								line-height: 40px;
						}
						& li {
								float: left;
								padding: 0 10px;
								margin-right: 2px;
								& i {
										background: #E7505A;
										width: auto;
										font-style: normal;
										font-size: 12px;
										font-weight: 400;
										height: 15px;
										line-height: 15px;
										color: #fff;
										border-radius: 20px;
										padding: 0 3px;
										position: relative;
										margin-left: 0;
										top: -6px;
										left: 0;
								}
						}
						& .active {
								border: none;
								background: 0 0;
								border-bottom: 3px solid #e7505a;
								position: relative;
								& a {
										border: none;
										font-weight: 700;
										color: #e7505a;
										display: block;
										position: relative;
								}
						}
				}
		}
</style>