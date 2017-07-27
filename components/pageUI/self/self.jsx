import {Input} from 'antd';
import Editor from './editor/editor.jsx';
import Nav from './nav/nav.jsx';
import './self.scss';
import Images from 'Images';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <div className="SELF">
                <div className="user-info">
                    <img className="header-img" src={"." + Images.userHead} alt=""/>
                    <h3>violin</h3>
                    <p>我是一个粉刷匠,粉刷本领强!</p>
                </div>
                <div className="user-content">
                    <div className="nav-bar">
                        <Nav />
                    </div>
                    <div className="user-panel">
                        <Editor />
                    </div>
                </div>
            </div>
        );
    }
}
