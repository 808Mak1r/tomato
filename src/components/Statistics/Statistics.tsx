import {format} from "date-fns";
import _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import Polygon from './Polygon'
import './Statistics.scss'


interface IStatisticsProps{
  todos: any[];
}

class Statistics extends React.Component<IStatisticsProps>{
  constructor(props){
    super(props)
  }

  get dailyTodos(){
		const obj = _.groupBy(this.finishedTodos,(todo)=>{
			return format(todo.updated_at,'YYYY-MM-D')
		})
		return obj
	}

  get finishedTodos(){
    return this.props.todos.filter(t => t.completed && !t.deleted)
  }

  public render(){
    return(
      <div className="Statistics" id="Statistics">
        <ul>
          <li>统计</li>
          <li>目标</li>
          <li>番茄历史</li>
          <li>
            任务历史
            累计完成{this.finishedTodos.length}个任务
            <Polygon data={this.dailyTodos} totalFinishedCount={this.finishedTodos.length}/>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
	todos: state.todos,
	...ownProps
})

export default connect(mapStateToProps)(Statistics)