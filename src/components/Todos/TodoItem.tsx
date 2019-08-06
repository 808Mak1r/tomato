import { Checkbox,Icon } from 'antd';
import classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import axios from "../../config/axios";
import {editTodo, updateTodo} from '../../redux/actions/todos'
import './TodoItem.scss'

interface ITodoItemProps {
	id: number;
	description: string;
	completed: boolean;
	editing: boolean;
	editTodo: (id:number)=>any;
	updateTodo: (payload:any)=> any;
}

interface ITodoItemState {
	editText: string;
}

class TodoItem extends React.Component<ITodoItemProps,ITodoItemState> {
	constructor(props){
		super(props)
		this.state = {
			editText: this.props.description
		}
	}

	public updateTodo = async (params:any) => {
		if(params.completed){
			params.completed_at = new Date()
		}
		try {
			const response = await axios.put(`todos/${this.props.id}`,params)
			this.props.updateTodo(response.data.resource)
		}catch (e) {
			throw new Error(e)
		}
	}

	public editTodo = () => {
		this.props.editTodo(this.props.id)
	}

	public onKeyUp = (e)=>{
		if(e.keyCode === 13 && this.state.editText !== ''){
			this.updateTodo({description: this.state.editText})
		}
	}

	public render() {
		const Editing = (
			<div className="editing">
				<input type="text" value={this.state.editText}
				       // tslint:disable-next-line: jsx-no-lambda
				       onChange={e => this.setState({editText: e.target.value})}
				       onKeyUp={this.onKeyUp}
				/>
				<div className="iconWrapper">
					<Icon type="enter" />
					<Icon type="delete" theme="filled"
					      // tslint:disable-next-line: jsx-no-lambda
					      onClick={e => this.updateTodo({deleted: true})}/>
				</div>
			</div>
		)
		const Text = <span className="text" onDoubleClick={this.editTodo}>{this.props.description}</span>
		const todoItemClass = classNames({
			TodoItem: true,
			editing: this.props.editing,
			// tslint:disable-next-line: object-literal-sort-keys
			completed: this.props.completed
		})
		return (
			<div className={todoItemClass} id="TodoItem">
				<Checkbox checked={this.props.completed}
				          // tslint:disable-next-line: jsx-no-lambda
				          onChange={e=> this.updateTodo({completed: e.target.checked})}
				/>
				{this.props.editing?Editing:Text}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps
})

const mapDispatchToProps = {
	editTodo,
	updateTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoItem);