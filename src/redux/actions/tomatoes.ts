import { ADD_TOMATO,INIT_TOMATOES } from "../actionTypes";

export const addTomato = (payload:any) => {
	return {
		type: ADD_TOMATO,
		// tslint:disable-next-line: object-literal-sort-keys
		payload
	}
}

export const initTomatoes = (payload:any[])=>{
	return {
		type: INIT_TOMATOES,
		// tslint:disable-next-line: object-literal-sort-keys
		payload
	}
}