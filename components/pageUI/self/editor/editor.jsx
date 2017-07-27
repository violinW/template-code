import React from 'react';
import ReactDom from 'react-dom';
import {Input, Button} from 'antd';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/lib/codemirror.css';
import './editor.scss';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '#请配置参数',
            template: '模板'
        };
    }

    componentDidMount() {
        //生成默认参数
        setTimeout(()=>this.newParamsArea(), 500);
        setTimeout(()=>this.newTemplateArea(), 1000);
    }

    updateCode = (newCode)=> {
        this.setState({
            code: newCode
        });
    };

    updateTemplate = (newTemplate)=> {
        this.setState({
            template: newTemplate
        });
    };

    newParamsArea = ()=> {
        var paramsOptions = {
            lineNumbers: true,
            mode: 'yaml',
            smartIndent: false
        };
        ReactDom.render(<CodeMirror value={this.state.code} onChange={this.updateCode} options={paramsOptions} />,
            $('#params-area')[0]);
    };

    newTemplateArea = ()=> {
        var templateOptions = {
            lineNumbers: true,
            mode: 'javascript',
            smartIndent: false
        };
        ReactDom.render(<CodeMirror value={this.state.template} onChange={this.updateTemplate} options={templateOptions} />,
            $('#template-area')[0]);
    };

    render() {
        return (
            <div className="EDITOR">
                <div className="edit-area">
                    <div id="params-area"></div>
                    <div id="template-area"></div>
                </div>
                <Button>
                    测试
                </Button>
                <div className="display-area"></div>
                <div className="code-area"></div>
            </div>
        );
    }
}
