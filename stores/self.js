import Dispatcher from 'Dispatcher';
import actionConstants from 'Constants';
import BasicFunc from 'Store/basicStoreFunc';

let draftList = [], draftDetail = {}, myWorksList=[];

const selfStore = BasicFunc("个人中心数据", "self", {
  //草稿列表
  getDraftList() {
    return draftList;
  },
  //草稿详情
  getDraftDetail() {
    return draftDetail;
  },
  //草稿详情
  getMyWorksList() {
    return myWorksList;
  }
});

Dispatcher.register(function (action) {
  const data = action.data;
  switch (action.type) {
    case actionConstants.self.SELF_DRAFT_LIST:
      draftList = data;
      break;
    case actionConstants.self.SELF_DRAFT_DETAIL:
      draftDetail = data;
      break;
    case actionConstants.self.SELF_MY_WORKS_LIST:
      myWorksList = data;
      break;
    default:
  }
  selfStore.emitChange();
  return true;
});

module.exports = selfStore;
