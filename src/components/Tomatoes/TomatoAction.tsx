import { Button } from 'antd';
import * as React from 'react'

interface ITomatoActionProps{
  startTomato: () => void;
  unfinishedTomato: any;
}

class TomatoAction extends React.Component<ITomatoActionProps> {
  constructor(props){
    super(props)
  }


  public render() {
    return(
      <div className="TomatoAction" id="TomatoAction">
        <Button className="startTomatoButton" // tslint:disable-next-line: jsx-no-lambda
          onClick={()=>{this.props.startTomato()}}>开始番茄</Button>
      </div>
    )
  }
}

export default TomatoAction