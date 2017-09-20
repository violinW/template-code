import Nav from './nav/nav.jsx';
import './self.scss';
import Images from 'Images';
import cookieUtil from 'Modules/cookie';
import {hashHistory} from 'react-router';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (!cookieUtil.hasItem("token")) {
      hashHistory.push("/login");
    }
  }

  render() {
    return (
        <div className="SELF">
          <div className="user-info">
            <img className="header-img" src={"." + Images.userHead} alt=""/>
            <h3>violin</h3>
            <p>我是一个粉刷匠,粉刷本领强!</p>
          </div>
          <div className="user-content">
            <Nav />
            <div className="user-panel">
              {this.props.children}
            </div>
          </div>
        </div>
    );
  }
}
