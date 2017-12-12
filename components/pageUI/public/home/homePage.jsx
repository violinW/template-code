import React from 'react';
import './homePage.scss';
import publicAction from 'Action/public.js';
import publicStore from 'Store/public';

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
