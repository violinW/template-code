/**
 * 前端消息的实体
 * @param title  通知提醒标题，必选, 默认为 "提示"
 * @param content 通知提醒内容，必选
 * @param type   //error,info,warning,success
 * @param modelType // notification, message , 默认为 notification
 * @param duration  自动关闭的时间, 默认 4.5 秒后自动关闭, 配置为 null 则不自动关闭
 */
function msg(title, content, type, modelType, duration) {
    this.title = title || '提示';
    this.content = content || '';
    this.type = type || 'info';
    this.modelType = modelType || 'notification';
    this.duration = duration || 4.5;
}

module.exports = msg;