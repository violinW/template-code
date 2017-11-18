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
import {Router, Route, IndexRoute, Redirect, hashHistory} from 'react-router';
//登录
import Login from 'Component/pageUI/login/login';
//找回密码
import Forgot from 'Component/pageUI/forgot/forgot';
//个人中心
import Body from 'Component/pageUI/body/body';
//个人中心
import Self from 'Component/pageUI/self/self';
//个人信息
import Info from 'Component/pageUI/self/info/info';
//草稿箱
import Editor from 'Component/pageUI/self/editor/editor';
//作品
import MyWork from 'Component/pageUI/self/myWork/work';

module.exports = (
    <Router history={hashHistory}>
      <Route component={Body}>
        <Redirect from='/' to='/self'/>
        <Route path='/login' component={Login}/>
        <Route path='/forgot' component={Forgot}/>
        <Redirect from='/self' to='/self/info'/>
        <Route path='/self' component={Self}>
          <Route path='draft' component={Editor}/>
          <Route path='draft/:id' component={Editor}/>
          <Route path='myWork' component={MyWork}/>
          <Route path='myWork/:id' component={MyWork}/>
          <Route path='info' component={Info}/>
        </Route>
      </Route>
    </Router>
);
