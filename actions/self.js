import RequestResultHandler from 'Modules/requestResultHandler';
import Dispatcher from 'Dispatcher';
import constants from 'Constants';
import Action from 'Modules/action';
import Msg from 'Modules/msg.js';

module.exports = {
  saveAsDraft(data, callback){
    RequestResultHandler('/draft/add', 'POST', data, function (result, status, xhr) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '新增草稿成功', 'success', 'message', '')));
      callback()
    }, function (xhr, status, error) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '新增草稿失败', 'error', 'message', '')));
    })
  }
}