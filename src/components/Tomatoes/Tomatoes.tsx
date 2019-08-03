import * as React from 'react';
// tslint:disable-next-line: ordered-imports
import {connect} from 'react-redux';
import axios from "../../config/axios";
// tslint:disable-next-line: ordered-imports
import {addTomato, initTomatoes, updateTomato} from "../../redux/actions/tomatoes";
import TomatoAction from './TomatoAction'
import './Tomatoes.scss'

interface ITomatoesProps {
	addTomato: (payload: any) => any;
	updateTomato: (payload: any) => any;
	initTomatoes: (payload: any[]) => any;
	tomatoes: any[];
}

class Tomatoes extends React.Component<ITomatoesProps> {
	constructor(props){
		super(props)
	}

	public componentDidMount(){
		this.getTomatoes()
	}

	get unfinishedTomato(){
		return this.props.tomatoes.filter(t => !t.description && !t.ended_at && !t.aborted)[0]
	}

	public getTomatoes = async ()=>{
		try {
			const response = await axios.get('tomatoes')
			this.props.initTomatoes(response.data.resources)
		}catch (e) {
			throw new Error(e)
		}
	}

	public startTomato = async ()=>{
		try{
			const response = await axios.post('tomatoes',{duration: 1500000})
			this.props.addTomato(response.data.resource)
		}catch (e) {
			throw new Error(e)
		}
	}

	public render() {
		return (
			<div className="Tomatoes" id="Tomatoes">
				<TomatoAction startTomato={this.startTomato} unfinishedTomato={this.unfinishedTomato} updateTomato={this.props.updateTomato}/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	tomatoes: state.tomatoes,
	...ownProps
})

const mapDispatchToProps = {
	addTomato,
	updateTomato,
	// tslint:disable-next-line: object-literal-sort-keys
	initTomatoes
}

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes);