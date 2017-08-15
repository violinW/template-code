import React from 'react';
import ReactDom from 'react-dom';
import {Input, Button} from 'antd';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/css/css';
import 'codemirror/lib/codemirror.css';
import './editor.scss';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '#请配置参数',
            template: '模板',
            css: ''
        };
    }

    componentDidMount() {
        //生成默认参数
        setTimeout(()=>this.newParamsArea(), 100);
        setTimeout(()=>this.newTemplateArea(), 200);
        setTimeout(()=>this.newCssArea(), 300);
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

    updateCss = (newCss)=> {
        this.setState({
            css: newCss
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

    newCssArea = ()=> {
        var cssOptions = {
            lineNumbers: true,
            mode: 'css',
            smartIndent: false
        };
        ReactDom.render(<CodeMirror value={this.state.css} onChange={this.updateCss} options={cssOptions} />,
          $('#css-area')[0]);
    };

    render() {
        return (
            <div className="EDITOR">
                <div>
                    <span className="title title-params">参数：</span>
                    <span className="title title-template">模板：</span>
                    <span className="title title-css">样式（css）：</span>
                </div>
                <div className="edit-area">
                    <div id="params-area"></div>
                    <div id="template-area"></div>
                    <div id="css-area"></div>
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
