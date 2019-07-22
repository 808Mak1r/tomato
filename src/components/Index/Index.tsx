import {Button} from 'antd';
import * as React from 'react';

class Index extends React.Component {
  public login = ()=>{
    // tslint:disable-next-line: no-console
    console.log(1)
  }
  public render() {
    return(
      <div>
        <Button onClick={this.login}>登录</Button>
      </div>
    );
  }
}

export default Index;