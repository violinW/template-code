import Dispatcher from 'Dispatcher';
import constants from 'Constants';
import BasicFunc from 'Store/basicStoreFunc';
import Msg from 'Modules/msg.js';

//弹出消息数据
var msg = new Msg();
//
var selectList = {};
//全局keyEvent
var keyEvent = {
    element: null,
    keyCode: null
};

const commonStore = BasicFunc("公共数据", "common", {
    // Emit Change event
    //设置不同的eventName可以监听不同的事件
    //eventName:   "KEY_EVENT"->全局键盘事件
    //             "MESSAGE_EVENT"->全局消息事件
    //             "MODAL"->全局弹窗事件
    emitEventChange(eventName) {
        this.emit(eventName);
    },

    // Add change listener
    addEventChangeListener(eventName, callback) {
        this.on(eventName, callback);
    },

    // Remove change listener
    removeEventChangeListener(eventName, callback) {
        this.removeListener(eventName, callback);
    },
    /**
     * 获取消息数据
     * @returns {*}
     */
    getMsg() {
        let result = msg;
        msg = new Msg(); //清除数据防止多次弹出消息
        return result;
    },
    getSelectList() {
        return selectList;
    },
    getKeyEvent() {
        return keyEvent;
    }
});

Dispatcher.register(function(action) {
    var data = action.data;
    switch (action.type) {
        // 更改页面的提示消息
        case constants.common.TOAST_TO_USER:
            msg = data;
            commonStore.emitEventChange("MESSAGE_EVENT");
            break;
        // 更改弹窗数据
        case constants.common.SET_MODAL:
            _.each(modal, function(value, key) {
                typeof data[key] !== "undefined"
                    ? modal[key] = data[key]
                    : null;
            });
            commonStore.emitEventChange('MODAL');
            break;
        case constants.common.SELECT_LIST:
            selectList = data;
            commonStore.emitChange();
            break;
        case constants.common.KEY_EVENTS:
            keyEvent = data;
            commonStore.emitEventChange('KEY_EVENT');
            break;
        default:
            return true;
    }
    return true;
});

module.exports = commonStore;
