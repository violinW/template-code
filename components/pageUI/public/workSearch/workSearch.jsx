import React from 'react';
import './workSearch.scss';
import publicAction from 'Action/public.js';
import publicStore from 'Store/public';
import Mustache from 'mustache';
import YAML from 'yamljs';
import reactTools from 'react-tools';
import {hashHistory} from 'react-router';
import Search from 'Component/basicUI/search/search.jsx';
import {Pagination} from 'antd';

export default class WorkSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      currentPage: 1,
      total: 0,
      pageSize: 20
    };
  }

  componentDidMount() {
    publicStore.addChangeListener(this.update);
    publicAction.getSearchWorkList(this.props.params.number, this.props.params.keywords == "BLACK_NULL" ? "" : this.props.params.keywords);
  }

  componentWillUnmount() {
    publicStore.removeChangeListener(this.update);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.keywords !== nextProps.params.keywords || this.props.params.number !== nextProps.params.number) {
      publicAction.getSearchWorkList(nextProps.params.number, nextProps.params.keywords == "BLACK_NULL" ? "" : nextProps.params.keywords);
    }
  }

  update = () => {
    const searchWorkList = publicStore.getSearchWorkList();
    this.setState({
      list: searchWorkList
    });
  };

  onCardClick = (UUID) => {
    hashHistory.push('/public/work/' + UUID);
  };
  makeItem = (item)=> {
    setTimeout(()=> {
      let idocument = $('#' + item.GUID).prop('contentDocument');
      try {
        let reference = JSON.parse(item.reference);
        _.each(reference, src=> {
          let sc = document.createElement("script");
          sc.setAttribute("src", src);
          sc.setAttribute("type", "text/javascript");
          idocument.body.appendChild(sc);
          idocument.body.appendChild($('<div id="content"></div>')[0]);
        })
        setTimeout(()=> {
          let idocument = $('#' + item.GUID).prop('contentDocument');

          let paramsJSON = YAML.parse(item.paramsInfo.body);
          let mustacheCode = Mustache.render(item.templateInfo.body, paramsJSON);

          let dealedCode = reactTools.transform(mustacheCode, {harmony: true});
          var injected_script = '(function(){' + dealedCode + '})()';
          var el = idocument.createElement('script');
          el.text = injected_script;
          idocument.body.appendChild(el);

          var cssStyle = idocument.createElement('style');
          cssStyle.textContent = item.cssInfo.body;
          idocument.body.appendChild(cssStyle);

        }, 500)
      }
      catch (err) {
        throw err;
      }
    }, 100)
    return <li>
      <iframe id={item.GUID}>
      </iframe>
      <div className="cover-desc" onClick={()=>this.onCardClick(item.GUID)}><p>{item.name}</p></div>
    </li>
  };

  search = (keywords)=> {
    hashHistory.push(`/public/workSearch/${keywords || "BLACK_NULL"}${this.props.params.number ? '/' + this.props.params.number : ''}`);
  };

  onPageChange = (page, pageSize)=> {
    publicAction.getSearchWorkList(this.props.params.number, this.props.params.keywords == "BLACK_NULL" ? "" : this.props.params.keywords, pageSize, page);
  };

  render() {
    return (
        <div className="WORK_SEARCH">
          <div className="home-head">
            <h1>画板之家</h1>
          </div>
          <div className="work-search-body">
            <Search keywords={this.props.params.keywords}
                    search={this.search}></Search>
            <ul className="group-body">
              {
                _.map(this.state.list, (item)=> {
                  return this.makeItem(item)
                })
              }
            </ul>
            <Pagination current={this.state.currentPage} total={this.state.total} pageSize={this.state.pageSize} onChange={this.onPageChange}/>
          </div>
        </div>
    );
  }
}
