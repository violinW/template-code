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
  },
  /**
   * 搜索作品列表
   * @param number 作品类别编号
   * @param keywords 搜索关键字
   */
  getSearchWorkList(number, keywords, pagesize, page){
    RequestResultHandler(`/public/work/search?number=${number || ""}&keywords=${keywords || ""}&pagesize=${pagesize || 20}&page=${page || 1}`, 'GET', null, function (result, status, xhr) {
      Dispatcher.dispatch(new Action(constants.public.SEARCH_WORK_LIST, result));
    }, function (xhr, status, error) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '获取作品列表失败', 'error', 'message', '')));
    })
  },
  /**
   * 根据作者Id获取作品列表
   * @param authorId
   */
  getAuthorWorkList(authorId){
    RequestResultHandler(`/public/work/author?authorId=${authorId || ""}`, 'GET', null, function (result, status, xhr) {
      Dispatcher.dispatch(new Action(constants.public.AUTHOR_WORK_LIST, result));
    }, function (xhr, status, error) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '获取作品列表失败', 'error', 'message', '')));
    })
  }
}