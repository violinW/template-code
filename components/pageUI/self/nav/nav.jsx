import React from 'react';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/lib/codemirror.css';
import './nav.scss';
import {hashHistory} from 'react-router';
import NavBasic from 'Component/basicUI/nav/nav';
import selfAction from 'Action/self.js';
import selfStore from 'Store/self';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draftList: [],
      myWorksList: []
    };
  }

  componentDidMount() {
    selfStore.addChangeListener(this.update);
    selfAction.getDraftList();
    selfAction.getMyWorksList();
  }

  componentWillUnmount() {
    selfStore.removeChangeListener(this.update);
  }

  update = () => {
    const draftList = selfStore.getDraftList() || [];
    const myWorksList = selfStore.getMyWorksList() || [];
    this.setState({
      draftList: _.map(draftList, (draft)=> {
        return {
          name: draft.name,
          src: "/self/draft/" + draft.GUID,
        }
      }),
      myWorksList: _.map(myWorksList, (work)=> {
        return {
          name: work.name,
          src: "/self/myWork/" + work.GUID,
        }
      })
    });
  }

  render() {
    let navList = [
      {
        icon: 'fa fa-user-o',
        name: "个人信息",
        src: "/self/info",
        children: []
      }, {
        icon: 'fa fa-bookmark-o',
        name: "我的作品",
        src: "/self/work",
        children: this.state.myWorksList
      }, {
        icon: 'fa fa-binoculars',
        name: "我的草稿",
        src: "/self/draft",
        children: this.state.draftList
      }
    ]
    return (
        <NavBasic navList={navList}/>
    );
  }
}
