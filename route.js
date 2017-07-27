
/*****************************************************************
 * 青岛雨人软件有限公司©2016版权所有
 *
 * 本软件之所有（包括但不限于）源代码、设计图、效果图、动画、日志、
 * 脚本、数据库、文档均为青岛雨人软件或其附属子公司所有。任何组织
 * 或者个人，未经青岛雨人软件书面授权，不得复制、使用、修改、分发、
 * 公布本软件的任何部分。青岛雨人软件有限公司保留对任何违反本声明
 * 的组织和个人采取法律手段维护合法权益的权利。
 *****************************************************************/
import 'Sass/common.scss';
import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';
//登录
import Login from 'Component/pageUI/login/login'
//个人中心
import Self from 'Component/pageUI/self/self'


module.exports = (
    <Router history={hashHistory}>
        <Route path='/login' component={Login} />
    <Route path='/self' component={Self} />
    </Router>
);
