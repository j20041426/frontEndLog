<style lang="less" scoped>
    li {
    	list-style: none;
    }
    .all {
    	display: flex;

    	.left {
    		width: 350px;
    		min-width: 350px;
    		height: 100vh;
    		overflow: auto;
    		&::-webkit-scrollbar {
    			/*滚动条整体样式*/
    			width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    		}
    		&::-webkit-scrollbar-thumb {
    			/*滚动条里面小方块*/
    			border-radius: 20px;
    			background: #00a680;
    			// background: #00a680;
    		}
    		li {
    			display: flex;
    			justify-content: space-between;
    			align-items: center;
    			padding: 15px 20px;
    			border-bottom: 1px solid #f8f8f8;
    			cursor: pointer;
    			&:hover {
    				background-color: #f8f8f8;
    			}
    			.liLeft {
    				width: 80%;
    				font-size: 14px;
    				div {
    					overflow: hidden;
    					text-overflow: ellipsis;
    					white-space: nowrap;
    					color: #6c6c72;
    					&:first-child {
    						margin-bottom: 10px;
    						color: #333;
    					}
    				}
    			}
    			.liRight {
    				font-size: 12px;
    				color: #9d9da1;
    			}
    		}
    		.currLi {
    			box-shadow: inset 10px 0 0 #00a680;
    			background-color: #f8f8f8;
    		}
    	}
    	.center,
    	.right {
    		padding: 0 30px 30px;
    		font-size: 14px;
    		h4 {
    			margin-bottom: 10px;
    			margin-top: 30px;
    			font-size: 16px;
    			font-weight: normal;
    		}
    		ul {
    			li {
    				height: 40px;
    				line-height: 40px;
    				border-bottom: 1px solid #f2f3f3;
    				span {
    					color: #4a4a4a;
    					&:first-child {
    						display: inline-block;
    						width: 110px;
    						color: #9d9da1;
    					}
    				}
    			}
    		}
    	}
    	.center {
    		position: relative;
    		flex: 1;
    		&::after,
    		&::before {
    			content: '';
    			position: absolute;
    			top: 0;
    			left: 0;
    			width: 1px;
    			height: 100vh;
    			background-color: #f2f3f3;
    		}
    		&::after {
    			left: 100%;
    		}
    		pre {
    			padding: 15px;
    			// font-family: inherit;
    			font-size: 16px;
    			color: #f00;
    			border: 1px solid #f2f3f3;
    			white-space: pre-wrap;
    		}
    	}
    	.right {
    		width: 290px;
    		min-width: 290px;
    	}
    }
</style>

<template>
    <div class="all" v-if="errorList.length">
        <ul class="left">
            <li v-for="err in errorList" :key="err._id" :class="{currLi:err._id===currErr._id}" @click="clickError(err)">
                <div class="liLeft">
                    <div>{{err.error.message.split(': ')[0]}}</div>
                    <div class="msg" :title="err.error.message.split(': ')[1]">{{err.error.message.split(': ')[1]}}</div>
                </div>
                <div class="liRight">
                    <!-- <div>{{err.general.time}}</div> -->
                    <div>14:43</div>
                </div>
            </li>
        </ul>
        <div class="center">
            <h4>概要信息</h4>
            <ul>
                <li>
                    <span>时间</span>
                    <span>{{currErr.general.time}}</span>
                </li>
                <li>
                    <span>项目</span>
                    <span>{{currErr.general.proName}}</span>
                </li>
                <li>
                    <span>地址</span>
                    <span>{{currErr.general.proUrl}}</span>
                </li>
            </ul>
            <div v-if="currErr.stack">
                <h4>堆栈信息</h4>
                <pre>{{currErr.stack}}</pre>
            </div>
            <h4>错误信息</h4>
            <ul>
                <li>
                    <span>文件</span>
                    <span>{{currErr.error.filename||'-'}}</span>
                </li>
                <li>
                    <span>行列</span>
                    <template v-if="currErr.error.lineno">
                        <span>{{currErr.error.lineno}}:{{currErr.error.colno}}</span>
                    </template>
                    <span v-else>-</span>
                </li>
                <li>
                    <span>信息</span>
                    <span>{{currErr.error.message}}</span>
                </li>
            </ul>
        </div>
        <div class="right">
            <h4>设备信息</h4>
            <ul>
                <li>
                    <span>浏览器</span>
                    <span>{{currErr.device.browser}}</span>
                </li>
                <li>
                    <span>浏览器版本</span>
                    <span>{{currErr.device.browserV}}</span>
                </li>
                <li>
                    <span>操作系统</span>
                    <span>{{currErr.device.system}}</span>
                </li>
                <li>
                    <span>设备</span>
                    <span>{{currErr.device.device}}</span>
                </li>
            </ul>
            <h4>位置信息</h4>
            <ul>
                <li>
                    <span>IP</span>
                    <span>{{currErr.location.ip||'-'}}</span>
                </li>
                <li>
                    <span>地点</span>
                    <span>{{currErr.location.address||'-'}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
    	name: 'errorShow',
    	data() {
    		return {
    			errorList: [],
    			currErr: {}
    		};
    	},
    	methods: {
    		getError() {
    			this.$http.post('/api/getError').then(({data}) => {
    				this.errorList = data;
    				this.currErr = data[0];
    				// setTimeout(() => this.getError(), 1000);
    			});
    		},
    		clickError(err) {
    			this.currErr = err;
    		}
    	},
    	created() {
    		this.getError();
    	}
    };
</script>
