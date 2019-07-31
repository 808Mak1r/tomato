import { Checkbox,Icon } from 'antd';
import classNames from 'classnames'
import * as React from 'react';
import './TodoItem.scss'

interface ITodoItemProps {
	id: number;
	description: string;
	completed: boolean;
	editing: boolean;
	update: (id: number, params: any)=> void;
	toEditing: (id: number) => void;
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

	public update = (params:any) => {
		this.props.update(this.props.id,params)
	}

	public toEditing = () => {
		this.props.toEditing(this.props.id)
	}

	public onKeyUp = (e)=>{
		if(e.keyCode === 13 && this.state.editText !== ''){
			this.update({description: this.state.editText})
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
					      onClick={e => this.update({deleted: true})}/>
				</div>
			</div>
		)
		const Text = <span className="text" onDoubleClick={this.toEditing}>{this.props.description}</span>
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
				          onChange={e=> this.update({completed: e.target.checked})}
				/>
				{this.props.editing?Editing:Text}
			</div>
		);
	}
}

export default TodoItem;