import './nav.scss';
import React from 'react';
import {UidMaker} from 'Modules/commonMethod';
import {hashHistory} from 'react-router';
import {LeftBG} from 'Images';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: ""
    };
  }

  /**
   * 导航栏点击事件
   * @param src
   */
  onNavListClick = (item) => {
    if (item.children && item.children.length) {
      this.setState({activeKey: item.src})
    }
    else {
      hashHistory.push(item.src);
    }
  };

  /**
   * 设置active属性
   */
  getActiveKey(src) {
    const {activeKey} = this.state;
    return src === activeKey || activeKey.indexOf(src + '/') !== -1
        ? "active"
        : "";
  }

  /**
   * 生成导航栏列表
   * @param list
   * @returns {*}
   */
  makeList(list) {
    let _this = this;
    return list.map(item => {
      let activeKey = _this.getActiveKey(item.src);
      return (
          <li
              key={UidMaker()}
              className={`nav-item ${activeKey}`}
              onClick={() => this.onNavListClick(item)}>

            <a src={item.src}>
              <i className={item.icon}></i>
              {item.name}<i
                className="fa fa-angle-right text-right "></i>
            </a>

            <ul className={`nav-child ${activeKey}`}>
              {
                _this.makeChildren(item.children)
              }
            </ul>
          </li>);
    })
  }

  /**
   * 生成子菜单
   * @param list
   * @returns {*}
   */
  makeChildren(list) {
    let _this = this;
    return list.map(item => {
      return (
          <li
              key={UidMaker()}
              className={`nav-child-item ${_this.getActiveKey(item.src)}`}
              onClick={() => this.onNavListClick(item)}>
            <a src={item.src}>{item.name}</a>
          </li>);
    });
  }

  render() {
    return (
        <ul className="NAV">
          {this.makeList(this.props.navList)}
        </ul>
    );
  }
}
