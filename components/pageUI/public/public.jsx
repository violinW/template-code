import './public.scss';

export default class Public extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <div className="PUBLIC">
              {this.props.children}
        </div>
    );
  }
}
