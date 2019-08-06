import { ADD_TODO,EDIT_TODO,INIT_TODOS,UPDATE_TODO, } from "../actionTypes";

export const addTodo = (payload:any)=>{
	return {
		type: ADD_TODO,
		// tslint:disable-next-line: object-literal-sort-keys
		payload
	}
}

export const initTodos = (payload:any[])=>{
	return {
		type: INIT_TODOS,
		// tslint:disable-next-line: object-literal-sort-keys
		payload
	}
}

export const updateTodo = (payload:any) =>{
	return {
		type: UPDATE_TODO,
		// tslint:disable-next-line: object-literal-sort-keys
		payload
	}
}

export const editTodo = (payload:number) =>{
	return {
		type: EDIT_TODO,
		// tslint:disable-next-line: object-literal-sort-keys
		payload
	}
}


