import React from 'react';
import './homePage.scss';
import publicAction from 'Action/public.js';
import publicStore from 'Store/public';
import Mustache from 'mustache';
import YAML from 'yamljs';
import reactTools from 'react-tools';
import {hashHistory} from 'react-router';
import Search from 'Component/basicUI/search/search.jsx';

export default class HomeFage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: []
    };
  }

  componentDidMount() {
    publicStore.addChangeListener(this.update);
    publicAction.getHomepageWorkList();
  }

  componentWillUnmount() {
    publicStore.removeChangeListener(this.update);
  }

  update = () => {
    const homepageWorkList = publicStore.getHomepageWorkList();
    this.setState({
      groupList: homepageWorkList
    });
  };

  onCardClick = (UUID) => {
    hashHistory.push('/public/work/' + UUID);
  };
  makeUl = (list)=> {
    return <ul className="group-body">
      {list.map((item)=> {
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

              let paramsJSON = YAML.parse(item.params);
              let mustacheCode = Mustache.render(item.template, paramsJSON);

              let dealedCode = reactTools.transform(mustacheCode, {harmony: true});
              var injected_script = '(function(){' + dealedCode + '})()';
              var el = idocument.createElement('script');
              el.text = injected_script;
              idocument.body.appendChild(el);

              var cssStyle = idocument.createElement('style');
              cssStyle.textContent = item.css;
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
      })}
    </ul>
  };

  getMoreWork = (number)=> {
    hashHistory.push('/public/workSearch/BLACK_NULL/' + number);
  };

  search = (keywords)=> {
    hashHistory.push(`/public/workSearch/${keywords || "BLACK_NULL"}`);
  };


  render() {
    return (
        <div className="HOME_PAGE">
          <div className="home-head">
            <h1>画板之家</h1>
          </div>
          <Search search={this.search}></Search>
          <div className="home-body">
            {
              _.map(this.state.groupList, (group)=> {
                return <div className="group-card">
                  <h3>{group.name}<span className="more-work" onClick={()=>this.getMoreWork(group.number)}>更多 >></span>
                  </h3>
                  {
                    this.makeUl(group.list)
                  }
                </div>
              })
            }
          </div>
        </div>
    );
  }
}
