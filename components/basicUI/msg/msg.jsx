/**
 * 全局消息提示组件
 *
 * props:
 *      title: 通知提醒标题，必选, 默认为 "提示"
 *      content: 通知提醒内容，必选
 *      type: error,info,warning,success
 *      modelType: notification, message , 默认为 notification
 *      duration: 自动关闭的时间, 默认 4.5 秒后自动关闭, 配置为 null 则不自动关闭
 */
var React = require('react');

var commonStore = require('Store/common.js');
var {notification, message} = require('antd');

var Msg = React.createClass({

    getInitialState: function () {
        return {
            msg: commonStore.getMsg()
        };
    },

    componentWillMount: function () {
        commonStore.addEventChangeListener('MESSAGE_EVENT', this.changeMsg);
    },

    componentWillUnmount: function () {
        commonStore.removeEventChangeListener('MESSAGE_EVENT', this.changeMsg);
    },

    changeMsg: function () {
        var _this = this;
        var msg = commonStore.getMsg();
        _this.setState({
            msg: msg
        });
        this.doing(msg);
    },
    /**
     * 根据相应的msg modelType 显示消息框
     */
    doing: function (msg) {
        if (!_.isEmpty(msg.content) && _.isEqual(msg.modelType, 'message')) {
            message[msg.type](msg.content);
        } else if (!_.isEmpty(msg.content) && _.isEqual(msg.modelType, 'notification')) {
            notification[msg.type]({
                message: msg.title, /* 标题 */
                duration: msg.duration, /* 自动关闭时间 */
                description: msg.content /* 内容 */
            });
        }
    },

    render: function () {
        return null;
    }
});
module.exports = Msg;