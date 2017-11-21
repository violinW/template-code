import React from 'react';
import ReactDom from 'react-dom';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/css/css';
import 'codemirror/lib/codemirror.css';
import './work.scss';
import reactTools from 'react-tools';
import Mustache from 'mustache';
import YAML from 'yamljs';
import selfAction from 'Action/self.js';
import selfStore from 'Store/self';
import {Modal, Button, Input} from 'antd';
import {hashHistory} from 'react-router';
const confirm = Modal.confirm;

export default class MyWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      save_type: ''
    };
  }

  componentDidMount() {
    selfStore.addChangeListener(this.update);
    this.generateContent();
    setTimeout(()=>this.newParamsArea(), 100);
    selfAction.getMyWorkById(this.props.params.id)
  }

  componentWillUnmount() {
    selfStore.removeChangeListener(this.update);
  }

  update = () => {
    const draftDetail = selfStore.getMyWorkDetailById();
    this.setState({
      name: draftDetail.name,
      type: draftDetail.type,
      css: draftDetail.css,
      params: draftDetail.params,
      template: draftDetail.template,
    });
    setTimeout(()=>this.newParamsArea(), 100);
  }

  updateParams = (newParams)=> {
    this.setState({
      params: newParams
    });
  };

  newParamsArea = ()=> {
    var paramsOptions = {
      lineNumbers: true,
      mode: 'yaml',
      smartIndent: false
    };
    $('#params-area').html('');
    ReactDom.render(<CodeMirror value={this.state.params} onChange={this.updateParams} options={paramsOptions}/>,
        $('#params-area')[0]);
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

  deleteMyWork = ()=> {
    let self = this;
    confirm({
      title: '删除提示',
      content: '你确定删除该作品么?',
      onOk() {
        selfAction.deleteMyWorkById(self.props.params.id, ()=> {
          selfAction.getMyWorksList();
          hashHistory.push('/self/info');
        });
      }
    });
  };
  publicMyWork = ()=> {
    let self = this;
    confirm({
      title: '发布作品提示',
      content: '你确定发布该作品么?',
      onOk() {
        selfAction.publicMyWork(self.props.params.id, ()=> {
          hashHistory.push('/self/info');
        });
      }
    });
  }
  cancelMyWork = ()=> {
    let self = this;
    confirm({
      title: '取消发布提示',
      content: '你确定取消发布该作品么?',
      onOk() {
        selfAction.cancelMyWork(self.props.params.id, ()=> {
          hashHistory.push('/self/info');
        });
      }
    });
  }

  render() {
    return (
        <div className="MYWORK">
          <div>
            <span className="title title-params">参数：</span>
          </div>
          <div className="edit-area">
            <div id="params-area"></div>
            <div id="template-area"></div>
            <div id="css-area"></div>
          </div>
          <Button onClick={this.generateResult}>
            测试
          </Button>
          {this.state.type == 'private'?
          <Button onClick={this.editMyWork}>
            修改
          </Button>: null}
          {this.state.type == 'private'?
              (<Button onClick={this.publicMyWork}>
            发布
          </Button>)
              :(<Button onClick={this.cancelMyWork}>
            取消发布
          </Button>)
              }
          <Button onClick={this.deleteMyWork}>
            删除
          </Button>
          <div id="display-area">
          </div>
          <div id="code-area"></div>
        </div>
    );
  }
}
