import React from 'react';
import ReactDom from 'react-dom';
import {Input, Button} from 'antd';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/lib/codemirror.css';
import './nav.scss';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myTemplate: [{
              key: "workOne",
              value: "作品1"
            }, {
                key: "workTwo",
                value: "作品2"
            }]
        };
    }

    componentDidMount() {
        //生成默认参数
    }

    render() {
        return (
            <div className="NAV">
                <p>我的作品</p>
                <ul className="myWork">
                    {
                        _.map(this.state.myTemplate, (template)=>{
                            return <li data-key={template.key}>{template.value}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}
