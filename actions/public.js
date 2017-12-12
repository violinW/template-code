import RequestResultHandler from 'Modules/requestResultHandler';
import Dispatcher from 'Dispatcher';
import constants from 'Constants';
import Action from 'Modules/action';
import Msg from 'Modules/msg.js';

module.exports = {
  getHomepageWorkList(callback){
    RequestResultHandler(`/public/home/workList`, 'GET', null, function (result, status, xhr) {
      Dispatcher.dispatch(new Action(constants.public.HOME_PAGE_WORK_LIST, result));
      callback();
    }, function (xhr, status, error) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '获取作品列表失败', 'error', 'message', '')));
    })
  }
}