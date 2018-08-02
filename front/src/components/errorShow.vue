<style lang="less" scoped>
    li {
        list-style: none;
    }
    .all {
        display: flex;

        .left {
            width: 350px;
            min-width: 350px;
            max-height: 100vh;
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
            padding: 0 30px;
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
            <li v-for="err in errorList" :key="err.logId" :class="{currLi:err.logId===currErr.logId}" @click="clickError(err)">
                <div class="liLeft">
                    <div v-if="err.message">{{err.message.split(': ')[0]}}</div>
                    <div v-if="err.message" class="msg" :title="err.message.split(': ')[1]">{{err.message.split(': ')[1]}}</div>
                </div>
                <div class="liRight">
                    <!-- <div>{{err.time}}</div> -->
                    <div>14:43</div>
                </div>
            </li>
        </ul>
        <div class="center">
            <h4>概要信息</h4>
            <ul>
                <li>
                    <span>时间</span>
                    <span>{{currErr.createDate|_formatDate}}</span>
                </li>
                <li>
                    <span>项目</span>
                    <span>{{currErr.projectName}}</span>
                </li>
                <li>
                    <span>地址</span>
                    <span>{{currErr.projectUrl}}</span>
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
                    <span>{{currErr.filename||'-'}}</span>
                </li>
                <li>
                    <span>信息</span>
                    <span>{{currErr.message}}</span>
                </li>
            </ul>
            <h4>Cookies</h4>
            <pre>{{currErr.cookies}}</pre>
            <h4>LocalStorage</h4>
            <pre>{{currErr.localStorage}}</pre>
            <h4>SessionStorage</h4>
            <pre>{{currErr.sessionStorage}}</pre>
        </div>
        <div class="right">
            <h4>设备信息</h4>
            <ul>
                <li>
                    <span>浏览器</span>
                    <span>{{currErr.browser}}</span>
                </li>
                <li>
                    <span>浏览器版本</span>
                    <span>{{currErr.browserVersion}}</span>
                </li>
                <li>
                    <span>操作系统</span>
                    <span>{{currErr.system}}</span>
                </li>
                <li>
                    <span>设备</span>
                    <span>{{currErr.device}}</span>
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
        filters: {
            _formatDate(date) {
                if (!date) {
                    return null;
                }
                date = new Date(date);
                let fmt = 'YYYY-MM-DD 星期E HH:mm:ss';
                if (fmt === undefined) {
                    return Number(date);
                } else {
                    var o = {
                        'M+': date.getMonth() + 1,
                        'D+': date.getDate(),
                        'h+':
                            date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
                        'H+': date.getHours(),
                        'm+': date.getMinutes(),
                        's+': date.getSeconds(),
                        'q+': Math.floor((date.getMonth() + 3) / 3),
                        S: date.getMilliseconds()
                    };
                    var week = {
                        '0': '\u65e5',
                        '1': '\u4e00',
                        '2': '\u4e8c',
                        '3': '\u4e09',
                        '4': '\u56db',
                        '5': '\u4e94',
                        '6': '\u516d'
                    };
                    if (/(Y+)/.test(fmt)) {
                        fmt = fmt.replace(
                            RegExp.$1,
                            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
                        );
                    }
                    if (/(E+)/.test(fmt)) {
                        fmt = fmt.replace(
                            RegExp.$1,
                            (RegExp.$1.length > 1
                                ? RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468'
                                : '') + week[date.getDay() + '']
                        );
                    }
                    for (var k in o) {
                        if (new RegExp('(' + k + ')').test(fmt)) {
                            fmt = fmt.replace(
                                RegExp.$1,
                                RegExp.$1.length === 1
                                    ? o[k]
                                    : ('00' + o[k]).substr(('' + o[k]).length)
                            );
                        }
                    }
                    return fmt;
                }
            }
        },
        methods: {
            getError() {
                this.$http.post('/frontLogApi/getError').then(({data}) => {
                    if (data.length) {
                        this.errorList = data;
                        this.currErr = data[0];
                        this.currErr.cookies = JSON.parse(data[0].cookies);
                        this.currErr.localStorage = JSON.parse(
                            data[0].localStorage
                        );
                        this.currErr.sessionStorage = JSON.parse(
                            data[0].sessionStorage
                        );
                    }
                });
            },
            clickError(err) {
                this.currErr = err;
                if (
                    typeof err.localStorage !== 'object' &&
                    err.localStorage !== '{}'
                )
                    this.currErr.localStorage = JSON.parse(err.localStorage);
                if (
                    typeof err.sessionStorage !== 'object' &&
                    err.sessionStorage !== '{}'
                )
                    this.currErr.sessionStorage = JSON.parse(err.sessionStorage);
            }
        },
        created() {
            this.getError();
        }
    };
</script>
