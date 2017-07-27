import React from 'react';
import {Input} from 'antd';
import './login.scss';
import Images from 'Images';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            message: ""
        };
    }


    render() {
        return (
            <div className="LOGIN">
                <img className="background-img" src={"."+Images.loginBackground}/>
                 <div className="login-block">
                     <div className="login-row">
                         <span>用户名:</span>
                         <Input/>
                     </div>
                     <div className="login-row">
                         <span>密码:</span>
                         <Input/>
                     </div>
                 </div>
            </div>
        );
    }
}
