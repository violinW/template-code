import React from 'react';
import {Input, Button} from 'antd';
import './login.scss';
import Images from 'Images';
import userAction from 'Action/user.js';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: ""
    };
  }

  login = ()=> {
    let {username, password} = this.state;
    if (!username || !password) {
      this.setState({
        message: '用户名和密码不可为空!'
      })
    } else {
      userAction.login(username, password, ()=> {

      })
    }
  };

  setField = (fieldName, fieldValue)=> {
    this.setState({
      [fieldName]: fieldValue
    })
  };

  render() {
    return (
        <div className="LOGIN">
          <img className="background-img" src={"." + Images.loginBackground}/>
          <div className="login-block">
            <div className="login-row">
              <span>用户名:</span>
              <Input onChange={(e)=>this.setField('username', e.target.value)}/>
            </div>
            <div className="login-row">
              <span>密码:</span>
              <Input onChange={(e)=>this.setField('password', e.target.value)}/>
            </div>
            <Button onClick={this.login}>登录</Button>
          </div>
        </div>
    );
  }
}
