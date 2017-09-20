import React from 'react';
import {Input, Button} from 'antd';
import './login.scss';
import Images from 'Images';
import userAction from 'Action/user.js';
import {hashHistory} from 'react-router';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            message: ""
        };
    }

    login = () => {
        let self = this;
        let {username, password} = this.state;
        if (!username || !password) {
            this.setState({
                message: '用户名和密码不可为空!'
            })
        } else {
            userAction.login(username, password, (error) => {
                if (error) {
                    self.setState({
                        message: error
                    });
                    return;
                }
                hashHistory.push('/self')
            })
        }
    };

    setField = (fieldName, fieldValue) => {
        let state = this.state;
        state[fieldName] = fieldValue;
        let {username, password, message} = this.state;
        message = (username && password) ? '' : '用户名和密码不可为空!';
        this.setState({
            [fieldName]: fieldValue,
            message
        })
    };

    forgotPW() {
        hashHistory.push('/forgot')
    }

    render() {
        return (
            <div className="LOGIN" style={{'backgroundImage': `url(${Images.loginBackground})`}}>
                <h2>粉刷匠模板网</h2>
                <div className="login-block">
                    <div className="login-row">
                        <Input placeholder="用户名" onChange={(e) => this.setField('username', e.target.value)}/>
                    </div>
                    <div className="login-row">
                        <Input placeholder="密码" onChange={(e) => this.setField('password', e.target.value)}/>
                    </div>
                    <span className="message">{this.state.message}</span>
                    <span className="forgot-pw" onClick={this.forgotPW}>忘记密码</span>
                    <Button onClick={this.login}>{"登录"}</Button>
                </div>
            </div>
        );
    }
}
