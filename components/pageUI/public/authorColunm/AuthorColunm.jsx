import React from 'react';
import './AuthorColunm.scss';
import publicAction from 'Action/public.js';
import publicStore from 'Store/public';
import Mustache from 'mustache';
import YAML from 'yamljs';
import reactTools from 'react-tools';
import {hashHistory} from 'react-router';
import {Pagination} from 'antd';

export default class AuthorColunm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      currentPage: 1,
      total: 200,
      pageSize: 20
    };
  }

  componentDidMount() {
    publicStore.addChangeListener(this.update);
    publicAction.getAuthorWorkList(this.props.params.authorId);
  }

  componentWillUnmount() {
    publicStore.removeChangeListener(this.update);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.authorId !== nextProps.params.authorId) {
      publicAction.getAuthorWorkList(nextProps.params.authorId);
    }
  }

  update = () => {
    const authorWorkList = publicStore.getAuthorWorkList();
    this.setState({
      list: authorWorkList
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

  onPageChange = (page, pageSize)=> {
    let stateData = {
      currentPage: page,
      pageSize
    };
    if (page * pageSize == this.state.total) {
      stateData.total = this.state.total + 200;
    }
    this.setState(stateData)
    publicAction.getSearchWorkList(this.props.params.number, this.props.params.keywords == "BLACK_NULL" ? "" : this.props.params.keywords, pageSize, page);
  };

  render() {
    return (
        <div className="AUTHOR_COLUNM">
          <div className="home-head">
            <h1>画板之家</h1>
          </div>
          <div className="work-search-body">
            <div>
              <h3>{this.state.name}</h3>
              <div>
                {
                  _.map(this.state.list, (item)=> {
                    return this.makeItem(item)
                  })
                }
              </div>
            </div>
          </div>
        </div>
    );
  }
}
