import {Button} from 'antd';
import * as React from 'react';
import axios from 'src/config/axios';

interface IRouter {
  history: any;
}

interface IIndexState {
	user: any;
}

class Index extends React.Component<IRouter,IIndexState> {
  constructor(props){
    super(props)
    this.state = {
      user: {}
    }
  }

  public async componentWillMount(){
    await this.getMe()
  }

	public getMe = async () => {
    try{
      const response = await axios.get('me');
      this.setState({user: response.data})
    }catch(e){
      // tslint:disable-next-line: no-console
      console.log(e.response)
      // tslint:disable-next-line: no-console
      console.error('获取用户失败')
      if(e.response.status === 401){
        this.props.history.push('/login')
      }
    }
		
	}

  public logout = ()=>{
    localStorage.setItem('x-token','')
    this.props.history.push('/login')
  }
  public render() {
    return(
      <div>
        <p>欢迎，{this.state.user && this.state.user.account}</p>
        <Button onClick={this.logout}>注销</Button>
      </div>
    );
  }
}

export default Index;