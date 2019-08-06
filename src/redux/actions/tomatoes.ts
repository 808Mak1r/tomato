import { ADD_TOMATO,INIT_TOMATOES,UPDATE_TOMATO } from "../actionTypes";

export const addTomato = (payload:any) => {
	return {
		type: ADD_TOMATO,
		// tslint:disable-next-line: object-literal-sort-keys
		payload
	}
}

export const updateTomato = (payload:any) => {
	return {
		type: UPDATE_TOMATO,
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
