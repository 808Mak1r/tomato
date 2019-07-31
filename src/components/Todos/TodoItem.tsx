import { Checkbox } from 'antd';
import * as React from 'react';

interface ITodoItemProps {
	id: number;
	description: string;
	completed: boolean;
	update: (id: number, params: any)=> void;
}

class TodoItem extends React.Component<ITodoItemProps> {
	constructor(props){
		super(props)
	}

	public update = (params:any) => {
		this.props.update(this.props.id,params)
	}

	public render() {
		return (
			<div className="TodoItem" id="TodoItem">
				<Checkbox checked={this.props.completed}
				          // tslint:disable-next-line: jsx-no-lambda
				          onChange={e=> this.update({completed: e.target.checked})}
				/>
				<span>{this.props.description}</span>
			</div>
		);
	}
}

export default TodoItem;