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
import reactTools from 'react-tools';
import Mustache from 'mustache';
import YAML from 'yamljs';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: '#请配置参数',
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

    updateCode = (newParams)=> {
        this.setState({
            params: newParams
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
        ReactDom.render(<CodeMirror value={this.state.params} onChange={this.updateCode} options={paramsOptions} />,
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
    generateResult = ()=> {
        let paramsJSON = YAML.parse(this.state.params);
        let mustacheCode = Mustache.render(this.state.template, paramsJSON);
        let dealedCode = reactTools.transform(mustacheCode, {harmony: true});
        debugger
        var iwindow = document.getElementsByTagName('iframe')[0].contentWindow;
        var idocument = $('iframe').prop('contentDocument');
        var injected_script = '(function(){'+dealedCode+'})()';
        var el = idocument.createElement('script');
        el.text = injected_script;
        idocument.head.appendChild($('<script src="http://cdn.bootcss.com/react/15.3.2/react.js"></script>')[0]);
        idocument.body.appendChild($('<div id="content"></div>')[0]);
        idocument.body.appendChild(el);
    }
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
                <Button onClick={this.generateResult}>
                    测试
                </Button>
                <Button>
                    保存成草稿
                </Button>
                <Button>
                    保存为我的作品
                </Button>
                <Button>
                    发布
                </Button>
                <div id="display-area">
                    <iframe id="dispFrame" />
                </div>
                <div id="code-area"></div>
            </div>
        );
    }
}
