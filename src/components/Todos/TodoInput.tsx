import {Icon,Input} from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'src/config/axios';
import {addTodo} from "../../redux/actions/todos";

interface ITodoInputState {
	description: string;
}

interface ITodoInputProps {
	addTodo: (payload:any) => any;
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
			this.postTodo()
		}
	}

	public postTodo = async ()=>{
		try {
			const response = await axios.post('todos',{description: this.state.description})
			this.props.addTodo(response.data.resource)
		}catch (e) {
			throw new Error(e)
		}
		this.setState({description: ''})
	}

	public render() {
		const { description } = this.state;
		const suffix = description ? <Icon type="enter" onClick={this.postTodo}/> : <span/>;
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

const mapStateToProps = (state, ownProps) => ({
	...ownProps
})

const mapDispatchToProps = {
	addTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoInput);
