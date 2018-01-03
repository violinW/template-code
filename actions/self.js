import RequestResultHandler from 'Modules/requestResultHandler';
import Dispatcher from 'Dispatcher';
import constants from 'Constants';
import Action from 'Modules/action';
import Msg from 'Modules/msg.js';

module.exports = {
  saveAsDraft(data, id, callback){
    if (id) {
      RequestResultHandler('/draft/edit/' + id, 'POST', data, function (result, status, xhr) {
        Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '编辑草稿成功', 'success', 'message', '')));
        callback()
      }, function (xhr, status, error) {
        Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '编辑草稿失败', 'error', 'message', '')));
      })
    } else {
      RequestResultHandler('/draft/add', 'POST', data, function (result, status, xhr) {
        Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '编辑草稿成功', 'success', 'message', '')));
        callback()
      }, function (xhr, status, error) {
        Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '编辑草稿失败', 'error', 'message', '')));
      })
    }
  },
  getDraftList(){
    RequestResultHandler('/draft/userList', 'GET', null, function (result, status, xhr) {
      Dispatcher.dispatch(new Action(constants.self.SELF_DRAFT_LIST, result));
    }, function (xhr, status, error) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '获取草稿列表失败', 'error', 'message', '')));
    })
  },
  getDraftDetail(id){
    RequestResultHandler('/draft/userDetail/' + id, 'GET', null, function (result, status, xhr) {
      Dispatcher.dispatch(new Action(constants.self.SELF_DRAFT_DETAIL, result));
    }, function (xhr, status, error) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '获取草稿详情失败', 'error', 'message', '')));
    })
  },
  deleteDraftById(id, callback){
    RequestResultHandler('/draft/delete/' + id, 'GET', null, function (result, status, xhr) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '删除草稿成功', 'success', 'message', '')));
      callback()
    }, function (xhr, status, error) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '删除草稿失败', 'error', 'message', '')));
    })
  },
  getMyWorksList(){
    RequestResultHandler('/works/myWorks/list', 'GET', null, function (result, status, xhr) {
      Dispatcher.dispatch(new Action(constants.self.SELF_MY_WORKS_LIST, result));
    }, function (xhr, status, error) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '获取我的作品列表失败', 'error', 'message', '')));
    })
  },
  getMyWorkById(id){
    RequestResultHandler(`/public/myWorks/detail/${id}`, 'GET', null, function (result, status, xhr) {
      Dispatcher.dispatch(new Action(constants.self.SELF_MY_WORK_DETAIL, result));
    }, function (xhr, status, error) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '获取我的作品详情失败', 'error', 'message', '')));
    })
  },
  publicMyWork(id, default_category_no, callback){
    RequestResultHandler(`/works/public/${id}?defaultCategoryNo=${default_category_no}`, 'GET', null, function (result, status, xhr) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '发布我的作品成功', 'success', 'message', '')));
      callback();
    }, function (xhr, status, error) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '发布我的作品失败', 'error', 'message', '')));
    })
  },
  cancelMyWork(id, callback){
    RequestResultHandler(`/works/cancel/${id}`, 'GET', null, function (result, status, xhr) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '取消发布我的作品成功', 'success', 'message', '')));
      callback();
    }, function (xhr, status, error) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '取消发布我的作品失败', 'error', 'message', '')));
    })
  },
  getDefaultCategoryList(){
    RequestResultHandler('/category/list', 'GET', null, function (result, status, xhr) {
      Dispatcher.dispatch(new Action(constants.self.DEFAULT_CATEGORY_LIST, result));
    }, function (xhr, status, error) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '取消发布我的作品失败', 'error', 'message', '')));
    })
  },
  deleteMyWorkById(id, callback){
    RequestResultHandler(`/works/myWorks/delete/${id}`, 'GET', null, function (result, status, xhr) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '删除我的作品成功', 'success', 'message', '')));
      callback();
    }, function (xhr, status, error) {
      Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '删除我的作品失败', 'error', 'message', '')));
    })
  },
  saveMyWork(data, id, callback){
    if (id) {
      RequestResultHandler('/works/edit/' + id, 'POST', data, function (result, status, xhr) {
        Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '编辑我的作品成功', 'success', 'message', '')));
        callback()
      }, function (xhr, status, error) {
        Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '编辑我的作品失败', 'error', 'message', '')));
      })
    } else {
      RequestResultHandler('/works/add', 'POST', data, function (result, status, xhr) {
        Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '新增我的作品成功', 'success', 'message', '')));
        callback()
      }, function (xhr, status, error) {
        Dispatcher.dispatch(new Action(constants.common.TOAST_TO_USER, new Msg('', '新增我的作品失败', 'error', 'message', '')));
      })
    }
  }
}