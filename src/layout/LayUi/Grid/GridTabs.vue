<template>
		<div class="grid-tabs">
				<ul style="width: 100%">
						<li class="title">{{label}}：</li>
						<li class="active">
								<router-link :to="">全部</router-link>
						</li>
						<li><a>待维护<span><i>2</i></span></a></li>
						<li><a>年费警告</a></li>
						<li><a>年费正常</a></li>
						<li><a>已放弃</a></li>
				</ul>
				<div style="clear:both;"></div>
		</div>
</template>

<script>
    export default {
        name: "GridTabs",
		    props:{
				    prop:{
						    type:String,
						    default:'status'
				    },
				    label:{
                type:String,
                default:''
				    }
		    },
		    created(){
					console.log(this.$route.params)
		    },

    }
</script>

<style  lang="scss" scoped>
		.grid-tabs{
				line-height: 40px;
				margin-bottom: 10px;
				width: 100%;
				border-bottom: 1px solid #ddd;
				& ul {
						list-style: none;
						margin: 0;
						padding: 0;
						& li.title{
								padding-left: 0;
								font-weight: 700;
								line-height: 40px;
						}
						& li {
								float: left;
								padding: 0 10px;
								margin-right: 2px;
								& i{
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
						& .active{
								border: none;
								background: 0 0;
								border-bottom: 3px solid #e7505a;
								position: relative;
								& a{
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