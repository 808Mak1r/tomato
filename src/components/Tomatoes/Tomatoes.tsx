import _ from 'lodash'
import * as React from 'react';
// tslint:disable-next-line: ordered-imports
import {format} from 'date-fns'
import {connect} from 'react-redux';
import axios from "../../config/axios";
// tslint:disable-next-line: ordered-imports
import {addTomato,updateTomato} from "../../redux/actions/tomatoes";
import TomatoAction from './TomatoAction'
import './Tomatoes.scss'
import TomatoList from './TomatoList'


interface ITomatoesProps {
	addTomato: (payload: any) => any;
	updateTomato: (payload: any) => any;
	tomatoes: any[];
}

class Tomatoes extends React.Component<ITomatoesProps> {
	constructor(props){
		super(props)
	}

	get unfinishedTomato(){
		return this.props.tomatoes.filter(t => !t.description && !t.ended_at && !t.aborted)[0]
	}

	get finishedTomatoes(){
		const finishedTomatoes = this.props.tomatoes.filter(t => t.description && t.ended_at && !t.aborted)
		return _.groupBy(finishedTomatoes,(tomato)=>{
			return format(tomato.started_at,'YYYY-MM-D')
		})
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
				<TomatoList finishedTomatoes={this.finishedTomatoes}/>
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
}

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes);