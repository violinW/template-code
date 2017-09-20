module.exports =
		`class MyText extends React.Component {
	render(){
    	return (<div>{{a}}</div>)
    }
}
ReactDOM.render(<MyText/>, $('#content')[0]);`;