import React from 'react';
import ReactDom from 'react-dom';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/css/css';
import 'codemirror/lib/codemirror.css';
import './workEditor.scss';
import reactTools from 'react-tools';
import Mustache from 'mustache';
import YAML from 'yamljs';
import selfAction from 'Action/self.js';
import selfStore from 'Store/self';
import {Modal, Button, Input} from 'antd';
import {hashHistory} from 'react-router';
const confirm = Modal.confirm;

export default class WorkEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      params: !this.props.params.id,
      template: !this.props.params.id,
      css: !this.props.params.id,
      visible: false,
      importVisible: false,
      save_type: '',
      referenceList: []
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
    const draftDetail = selfStore.getMyWorkDetailById();
    const defaultCategoryList = selfStore.getDefaultCategoryList();
    let referenceList = JSON.parse(draftDetail.reference);
    this.setState({
      name: draftDetail.name,
      type: draftDetail.type,
      css: draftDetail.css,
      params: draftDetail.params,
      template: draftDetail.template,
      referenceList,
      default_category_name: draftDetail.defaultCategoryName || "无",
      default_category_list: defaultCategoryList
    });
    setTimeout(()=>this.newParamsArea(), 100);
    setTimeout(()=>this.newTemplateArea(), 200);
    setTimeout(()=>this.newCssArea(), 300);
    setTimeout(()=>this.generateContent(), 400);
  }

  init = ()=> {
    //生成默认参数
    setTimeout(()=>this.newParamsArea(), 100);
    setTimeout(()=>this.newTemplateArea(), 200);
    setTimeout(()=>this.newCssArea(), 300);
    this.generateContent();
    selfAction.getMyWorkById(this.props.params.id);

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
    let srcList = [
      //   "//cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js",
      // "//cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.min.js",
      //"//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"
    ]

    let importReference = this.state.referenceList;
    let finalList = srcList.concat(importReference);
    _.each(finalList, item=> {
      if (/[\S]+\.js$/.test(item)) {
        let sc = document.createElement("script");
        sc.setAttribute("src", item);
        sc.setAttribute("type", "text/javascript");
        idocument.body.appendChild(sc);

      } else if (/[\S]+\.css$/.test(item)) {
        let lk = document.createElement("link");
        lk.setAttribute("href", item);
        lk.setAttribute("rel", "stylesheet");
        idocument.body.appendChild(lk);
      }

    })
    idocument.body.appendChild($('<div id="content"></div>')[0]);
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
    selfAction.saveMyWork({
      name: this.state.name,
      params: this.state.params,
      css: this.state.css,
      reference: JSON.stringify(this.state.referenceList),
      template: this.state.template
    }, this.props.params.id, ()=> {
      selfAction.getMyWorksList();
      hashHistory.push('/self/myWork/' + this.props.params.id);
    })
  };

  handleCancel = ()=> {
    this.setState({
      visible: false,
      importVisible: false
    })
  };

  onNameChange = (e)=> {
    this.setState({
      name: e.target.value
    })
  };

  importManagement = ()=> {
    this.setState({
      importVisible: true
    })
  };

  addReference = ()=> {
    let reference = $('#reference-input').val();
    let referenceList = this.state.referenceList;
    referenceList.push(reference);
    this.setState({
      referenceList
    });
    $('#reference-input').val('');
  };
  importReference = ()=> {
    this.handleCancel();
    this.generateContent();
  };

  render() {
    return (
        <div className="WORK-EDITOR">
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
          <div><Button onClick={this.importManagement}>引用管理</Button></div>
          <Button onClick={this.generateResult}>
            测试
          </Button>
          <Button onClick={this.saveAsWork}>
            保存
          </Button>
          <div id="display-area">
          </div>
          <div id="code-area"></div>
          <Modal
              title="引用管理"
              visible={this.state.importVisible}
              onOk={this.importReference}
              onCancel={this.handleCancel}
          >
            <Input id="reference-input" style={{width: 380, marginRight: "20px"}}
                   placeholder="请输入有效链接,如://cdn.bootcss.com/jquery/1.11.3/jquery.min.js"/>
            <Button onClick={this.addReference}>
              添加引用
            </Button>
            <div className="reference-list" style={{margin: "10px 0 10px 20px"}}>
              {_.map(this.state.referenceList, (reference)=> {
                return <h3 className="reference-item">{reference}
                  <Button style={{padding: "0", border: "none", marginLeft: "5px", height: "15px", color: "red"}}
                          onClick={()=>this.deleteReference(reference)}>
                    <icon className="fa fa-close"></icon>
                  </Button>
                </h3>
              })}
            </div>
          </Modal>
          <Modal
              title="请填写名称"
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
