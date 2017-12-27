import './search.scss';
import React from 'react';
import {hashHistory} from 'react-router';
import {LeftBG} from 'Images';
import {Button, Input} from 'antd';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: this.props.value
    };
  }

  search = ()=> {
    this.props.search(this.state.keywords);
  };

  onChange = (e) => {
    this.setState({
      keywords: e.target.value
    })
  };

  render() {
    return (
        <div className="SEARCH">
          <Input id="search-input" placeholder="请输入关键字" onChange={this.onChange}
                 defaultValue={this.state.keywords == "BLACK_NULL" ? "" : this.state.keywords}/>
          <Button onClick={this.search} type="primary">
            搜索
          </Button>
        </div>
    );
  }
}
