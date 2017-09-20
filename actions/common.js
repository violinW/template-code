/**
 * 公共方法
 */
import Dispatcher from 'Dispatcher';
import constants from 'Constants';
import Action from 'Modules/action';
import Msg from 'Modules/msg.js';

module.exports = {
    /**
     * 消息提示
     */
    sendMessage(message, type) {
        Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', message, type, 'message', '')));
    },
    /**
     * 通知提示
     */
    notifyMessage(message, type) {
        Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', message, type, 'notification', '')));
    }
};
