import {ADD_TODO} from './actionTypes'


export const addTodo = (payload:any) => {
  return{
    type: ADD_TODO,
    // tslint:disable-next-line: object-literal-sort-keys
    payload
  }
}