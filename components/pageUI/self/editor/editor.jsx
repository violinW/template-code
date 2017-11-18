import React from 'react';
import ReactDom from 'react-dom';
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
import selfAction from 'Action/self.js';
import selfStore from 'Store/self';
import {Modal, Button, Input} from 'antd';
import defaultCss from './defaultCss';
import defaultParams from './defaultParams';
import defaultTemplate from './defaultTemplate';
import {hashHistory} from 'react-router';
const confirm = Modal.confirm;

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      params: !this.props.params.id && defaultParams,
      template: !this.props.params.id && defaultTemplate,
      css: !this.props.params.id && defaultCss,
      visible: false,
      save_type: ''
    };
  }

  componentDidMount() {
    selfStore.addChangeListener(this.update);
    this.init();
  }

  componentWillUnmount() {
    selfStore.removeChangeListener(this.update);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      if (!this.props.params.id) {
        this.state = {
          params: defaultParams,
          template: defaultTemplate,
          css: defaultCss
        };
      } else {
        selfAction.getDraftDetail(this.props.params.id);
      }
    }
  }

  update = () => {
    const draftDetail = selfStore.getDraftDetail() || {};
    this.setState({
      name: draftDetail.name,
      params: draftDetail.params,
      template: draftDetail.template,
      css: draftDetail.css,
    });
    setTimeout(()=>this.newParamsArea(), 100);
    setTimeout(()=>this.newTemplateArea(), 200);
    setTimeout(()=>this.newCssArea(), 300);
  }

  init = ()=> {
    //生成默认参数
    setTimeout(()=>this.newParamsArea(), 100);
    setTimeout(()=>this.newTemplateArea(), 200);
    setTimeout(()=>this.newCssArea(), 300);
    this.generateContent();
    this.props.params.id && selfAction.getDraftDetail(this.props.params.id);

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
    $('#params-area').html('');
    ReactDom.render(<CodeMirror value={this.state.params} onChange={this.updateCode} options={paramsOptions}/>,
        $('#params-area')[0]);
  };

  newTemplateArea = ()=> {
    var templateOptions = {
      lineNumbers: true,
      mode: 'javascript',
      smartIndent: false
    };
    $('#template-area').html('');
    ReactDom.render(<CodeMirror value={this.state.template} onChange={this.updateTemplate} options={templateOptions}/>,
        $('#template-area')[0]);
  };

  newCssArea = ()=> {
    var cssOptions = {
      lineNumbers: true,
      mode: 'css',
      smartIndent: false
    };
    $('#css-area').html('');
    ReactDom.render(<CodeMirror value={this.state.css} onChange={this.updateCss} options={cssOptions}/>,
        $('#css-area')[0]);
  };

  generateResult = ()=> {
    let paramsJSON = YAML.parse(this.state.params);
    let mustacheCode = Mustache.render(this.state.template, paramsJSON);

    this.generateDisplay(mustacheCode);
    this.generateCode(mustacheCode);
  };

  generateDisplay = (mustacheCode)=> {
    let dealedCode = reactTools.transform(mustacheCode, {harmony: true});
    var idocument = $('iframe').prop('contentDocument');
    var injected_script = '(function(){' + dealedCode + '})()';
    var el = idocument.createElement('script');
    el.text = injected_script;
    idocument.body.appendChild(el);

    let cssCode = this.state.css;
    var cssStyle = idocument.createElement('style');
    cssStyle.textContent = cssCode;
    idocument.body.appendChild(cssStyle);
  };

  generateCode = (mustacheCode)=> {
    var jsOptions = {
      lineNumbers: true,
      mode: 'javascript',
      smartIndent: false
    };
    $('#code-area').html('');
    ReactDom.render(<CodeMirror value={mustacheCode} options={jsOptions}/>,
        $('#code-area')[0]);
  };

  generateContent = ()=> {
    $('#display-area').html('<iframe id="dispFrame" />');
    let idocument = $('iframe').prop('contentDocument');
    let srcList = ["//cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js",
      "//cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.min.js",
      "//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"]

    _.each(srcList, item=> {
      let sc = document.createElement("script");
      sc.setAttribute("src", item);
      sc.setAttribute("type", "text/javascript");
      idocument.body.appendChild(sc);

    })
    idocument.body.appendChild($('<div id="content"></div>')[0]);
  };

  saveAsDraft = ()=> {
    this.setState({
      visible: true,
      save_type: 'draft'
    })
  };

  saveAsWork = ()=> {
    this.setState({
      visible: true,
      save_type: 'work'
    })
  };

  deleteDraft = ()=> {
    let self = this;
    confirm({
      title: '删除提示',
      content: '你确定删除该草稿么?',
      onOk() {
        selfAction.deleteDraftById(self.props.params.id, ()=> {
          selfAction.getDraftList();
          hashHistory.push('/self/info');
        });
      }
    });
  };

  handleOk = ()=> {
    if (this.state.save_type === "draft") {
      selfAction.saveAsDraft({
        name: this.state.name,
        params: this.state.params,
        css: this.state.css,
        template: this.state.template
      }, this.props.params.id, ()=> {
        selfAction.getDraftList();
        hashHistory.push('/self/info');
      })

    }else if(this.state.save_type === "work"){
      selfAction.saveMyWork({
        name: this.state.name,
        params: this.state.params,
        css: this.state.css,
        template: this.state.template
      }, null, ()=> {
        selfAction.getMyWorksList();
        hashHistory.push('/self/info');
      })
    }
  };

  handleCancel = ()=> {
    this.setState({
      visible: false,
      name: ""
    })
  };

  onNameChange = (e)=> {
    this.setState({
      name: e.target.value
    })
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
          <Button onClick={this.generateResult}>
            测试
          </Button>
          <Button onClick={this.saveAsDraft}>
            保存成草稿
          </Button>
          <Button onClick={this.saveAsWork}>
            保存为我的作品
          </Button>
          <Button onClick={this.deleteDraft}>
            删除
          </Button>
          <div id="display-area">
          </div>
          <div id="code-area"></div>
          <Modal
              title="请填写标题"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
          >
            <Input value={this.state.name} onChange={this.onNameChange}/>
          </Modal>
        </div>
    );
  }
}
