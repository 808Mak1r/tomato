import {format} from "date-fns";
import * as React from 'react'
import {connect} from 'react-redux'
import axios from 'src/config/axios'
import {updateTodo} from '../../../redux/actions/todos'
import './TodoHistoryTodoItem.scss'


interface ITodoHistoryTodoItemProps{
  todo: any;
  itemType: string;
  updateTodo: (payload)=>void;
}

class TodoHistoryTodoItem extends React.Component<ITodoHistoryTodoItemProps>{
  constructor(props){
    super(props)
  }

  public updateTodo = async (params:any)=>{
    try{
      const response = await axios.put(`todos/${this.props.todo.id}`,params)
      this.props.updateTodo(response.data.resource)
    }catch(e){
      throw new Error(e)
    }
  }

  public render(){
    let action
    let formatText
    let time
    if(this.props.itemType === 'finished') {
      formatText = 'HH:mm'
      time = this.props.todo.updated_at
      action = (
        <div className="action">
          <span 
            // tslint:disable-next-line: jsx-no-lambda
            onClick={()=>this.updateTodo({completed: false})}>恢复</span>
          <span 
            // tslint:disable-next-line: jsx-no-lambda
            onClick={()=>this.updateTodo({deleted: true})}>删除</span>
        </div>
      )
    }else if(this.props.itemType === 'deleted'){
      formatText = 'YYYY-MM-DD'
      time = this.props.todo.created_at
      action = (
        <div className="action">
          <span 
            // tslint:disable-next-line: jsx-no-lambda
            onClick={()=>this.updateTodo({deleted: false})}>恢复</span>
        </div>
      )
    }
    return(
      <div className="TodoHistoryTodoItem" id="TodoHistoryTodoItem">
        <div className="text">
          <span className="time">{format(time,formatText)}</span>
          <span className="description">{this.props.todo.description}</span>
        </div>
        {action}
      </div>
    )
  }
}

const mapStateToProps = (ownProps) => ({
	...ownProps
})

const mapDispatchToProps = {
	updateTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoHistoryTodoItem)