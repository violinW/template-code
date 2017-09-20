import Dispatcher from 'Dispatcher';
import actionConstants from 'Constants';
import BasicFunc from 'Store/basicStoreFunc';

let selfNavList = [];

const selfStore = BasicFunc("个人中心数据", "self", {
  getSelfNavList() {
    return selfNavList;
  }
});

Dispatcher.register(function (action) {
  const data = action.data;
  switch (action.type) {
    case actionConstants.self.SELF_NAV_LIST:
      selfNavList = data;
      break;
    default:
  }
  selfStore.emitChange();
  return true;
});

module.exports = selfStore;
