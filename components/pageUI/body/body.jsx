import React from 'react';
/* 用于整个页面的消息提示 */
import Msg from 'Component/basicUI/msg/msg.jsx';
import './body.scss';

export default class Forgot extends React.Component {
  render() {
    return (
        <div className="BODY">
          {this.props.children}
          <Msg />
        </div>
    );
  }
}
