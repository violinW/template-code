import Dispatcher from 'Dispatcher';
import actionConstants from 'Constants';
import BasicFunc from 'Store/basicStoreFunc';

let draftList = [];

const selfStore = BasicFunc("个人中心数据", "self", {
  getDraftList() {
    return draftList;
  }
});

Dispatcher.register(function (action) {
  const data = action.data;
  switch (action.type) {
    case actionConstants.self.SELF_DRAFT_LIST:
      draftList = data;
      break;
    default:
  }
  selfStore.emitChange();
  return true;
});

module.exports = selfStore;
