import React from 'react';
import {Input, Button} from 'antd';
import './forgot.scss';
import Images from 'Images';
import userAction from 'Action/user.js';

export default class Forgot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false
        };
    }

    findOut = () => {
        userAction.findPassword(this.state.count, () => {
            this.setState({status: true});
        });
    }

    render() {
        return (
            <div className="FORGOT" style={{'backgroundImage': `url(${Images.loginBackground})`}}>
                <div className="forgot-block">
                    {
                        !this.state.status ? <div>
                                <span>找回密码</span>
                                <Input placeholder="注册邮箱/手机号码/用户名"
                                       onChange={(e) => this.setState('count', e.target.value)}/>
                                <Button onClick={this.findOut}>找回</Button>
                            </div>
                            : <span>发送成功，请登录邮箱完成新密码设置!</span>
                    }
                </div>
            </div>
        );
    }
}
