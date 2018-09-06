import Dispatcher from 'Dispatcher';
import actionConstants from 'Constants';
import BasicFunc from 'Store/basicStoreFunc';

let homepageWorkList = [], searchWorkList, authorWorkList;

const publicStore = BasicFunc("网站数据", "public", {
  //首页作品列表
  getHomepageWorkList() {
    return homepageWorkList;
  },
  //首页作品列表
  getSearchWorkList() {
    return searchWorkList;
  },
  //获取作者作品列表
  getAuthorWorkList(){
    return authorWorkList;
  }
});

Dispatcher.register(function (action) {
  const data = action.data;
  switch (action.type) {
    case actionConstants.public.HOME_PAGE_WORK_LIST:
      homepageWorkList = data;
      break;
    case actionConstants.public.SEARCH_WORK_LIST:
      searchWorkList = data;
      break;
    case actionConstants.public.AUTHOR_WORK_LIST:
      authorWorkList = data;
      break;
    default:
  }
  publicStore.emitChange();
  return true;
});

module.exports = publicStore;
