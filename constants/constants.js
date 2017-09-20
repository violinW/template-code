import keyMirror from 'keymirror';
import self from './self';

const common = {
    //普适方法
    SET_LIST: null,          //设置列表
    SET_DETAIL: null,          //设置详情
    //消息
    TOAST_TO_USER: null,
    //全局键盘事件
    KEY_EVENTS: null
};

module.exports = {
    common: keyMirror(common),
    self: keyMirror(self),
};
