import * as React from 'react';
import TodoInput from 'src/components/Todos/TodoInput'
import axios from 'src/config/axios'
import './Todos.scss'

class Todos extends React.Component {

	public addTodo = async (params:any)=>{
		try{
			const response = await axios.post('todos',params)
			// tslint:disable-next-line: no-console
			console.log(response.data);
		}catch (e) {
			throw new Error(e)
		}
	}

	public render() {
		return (
			<div className="Todos" id="Todos">	
        <TodoInput 
          // tslint:disable-next-line: jsx-no-lambda
          addTodo={(params)=>this.addTodo(params)}
        />
			</div>
		);
	}
}

export default Todos;