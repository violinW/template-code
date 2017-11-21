import React from 'react';
import './homePage.scss';
import {Input, Button} from 'antd';
import Images from 'Images';

export default class HomeFage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: [{
        name: 'List'
      }]
    };
  }

  render() {
    return (
        <div className="HOME_PAGE">
          <div className="home-head">
            <h1>画板之家</h1>
          </div>
          <div className="home-body">
            {
                _.map(this.state.groupList, (group)=> {
                  return <div className="group-card">
                    <h3>{group.name}</h3>
                    <div>

                    </div>
                  </div>
                })
            }
          </div>
        </div>
    );
  }
}
