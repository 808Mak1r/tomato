import * as React from 'react';
// tslint:disable-next-line: ordered-imports
import {Input,Icon} from 'antd';

interface ITodoInputState {
	description: string;
}

interface ITodoInputProps {
	addTodo: (params:any) => void;
}

class TodoInput extends React.Component<ITodoInputProps,ITodoInputState> {
	constructor(props){
		super(props)
		this.state = {
			description: ''
		}
	}

	public onKeyUp = (e) => {
		if(e.keyCode === 13 && this.state.description !== ''){
			this.addTodo()
		}
	}

	public addTodo = ()=>{
    this.props.addTodo({description: this.state.description})
    this.setState({description: ''})
	}

	public render() {
		const { description } = this.state;
		const suffix = description ? <Icon type="enter" onClick={this.addTodo}/> : <span/>;
		return (
      <div className="TodoInput" id="TodoInput">
	      <Input
		      placeholder="添加新任务"
		      suffix={suffix}
		      value={description}
		      // tslint:disable-next-line: jsx-no-lambda
		      onChange={(e) => this.setState({description: e.target.value})}
		      onKeyUp={this.onKeyUp}
	      />
      </div>
		);
	}
}

export default TodoInput;