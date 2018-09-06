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
import commonAction from 'Action/common.js';
import selfStore from 'Store/self';
import {Modal, Button, Input, Select} from 'antd';
import {hashHistory} from 'react-router';
const confirm = Modal.confirm;

export default class MyWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      save_type: '',
      visible: false,
      default_category_list: [],
      default_category_no: '',
      referenceList: []
    };
  }

  componentDidMount() {
    selfStore.addChangeListener(this.update);
    this.generateContent();
    setTimeout(()=>this.newParamsArea(), 100);
    selfAction.getMyWorkById(this.props.params.id);
    selfAction.getDefaultCategoryList();
  }

  componentWillUnmount() {
    selfStore.removeChangeListener(this.update);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      selfAction.getMyWorkById(nextProps.params.id);
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
    setTimeout(()=>this.generateContent(), 200);
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
    let srcList = [
      //   "//cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js",
      // "//cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.min.js",
      //"//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"
    ];

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
    this.setState({
      visible: true
    })
  }
  cancelMyWork = ()=> {
    let self = this;
    confirm({
      title: '取消发布提示',
      content: '你确定取消发布该作品么?',
      onOk() {
        selfAction.cancelMyWork(self.props.params.id, ()=> {
          selfAction.getMyWorkById(self.props.params.id);
        });
      }
    });
  }

  handleOk = ()=> {
    if (this.state.default_category_no) {
      let self = this;
      selfAction.publicMyWork(this.props.params.id, this.state.default_category_no, ()=> {
        self.handleCancel();
        selfAction.getMyWorkById(self.props.params.id);
      });
    } else {
      commonAction.sendMessage('请选择发布类型', 'error')
    }
  };

  handleCancel = ()=> {
    this.setState({
      visible: false,
      name: ""
    })
  };

  handleChange = (value)=> {
    this.setState({
      default_category_no: value
    })
  };

  editMyWork = ()=> {
    hashHistory.push('/self/work/edit/' + this.props.params.id);
  };

  buttonList = (type)=> {
    if (type == "private") {
      return <span>
         <Button onClick={this.editMyWork}>
            修改
          </Button>
        <Button onClick={this.publicMyWork}>
            发布
          </Button>
          <Button onClick={this.deleteMyWork}>
            删除
          </Button>
      </span>
    }else{
      return <Button onClick={this.cancelMyWork}>
        取消发布
      </Button>
    }
  }

  importManagement = ()=> {
    this.setState({
      importVisible: true
    })
  };

  handleCancelImport = ()=> {
    this.setState({
      importVisible: false,
    })
  };


  render() {
    return (
        <div className="MYWORK">
          <h1 className="work-title">{this.state.name}</h1>
          {this.state.type == 'public' ?
              <h3 className="work-category">模板类型: {this.state.default_category_name}</h3>
              : null}
          <div>
            <span className="title title-params">参数：</span>
          </div>
          <div className="edit-area">
            <div id="params-area"></div>
          </div>
          <div><Button onClick={this.importManagement}>引用列表</Button></div>
          <Button onClick={this.generateResult}>
            测试
          </Button>
          {/myWork/.test(window.location.href) && this.buttonList(this.state.type)}
          <div id="display-area">
          </div>
          <div id="code-area"></div>
          <Modal
              title="引用列表"
              visible={this.state.importVisible}
              onCancel={this.handleCancelImport}
              footer={null}
          >
            <div className="reference-list" style={{margin: "10px 0 10px 20px"}}>
              {_.map(this.state.referenceList, (reference)=> {
                return <h3 className="reference-item">{reference}
                </h3>
              })}
            </div>
          </Modal>
          <Modal
              title="请选择发布类型"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
          >
            <Select
                style={{width: 400}}
                placeholder="发布类型"
                onChange={this.handleChange}
            >
              {_.map(this.state.default_category_list, (item)=> {
                return <Option value={item.number}>{item.name}</Option>
              })}
            </Select>
          </Modal>
        </div>
    );
  }
}
