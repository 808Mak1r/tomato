import { Dropdown, Icon, Menu } from "antd";
import * as React from 'react';
import 'src/components/Home/Home.scss'
import Todos from 'src/components/Todos/Todos'
import axios from 'src/config/axios'
import history from 'src/config/history'


interface IRouter {
  history: any;
}

interface IIndexState {
  user: any
}

const logout = () => {
  localStorage.setItem('x-token', '')
  history.push('/login')
}

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="user" />
      个人设置
    </Menu.Item>
    <Menu.Item key="2" onClick={logout}>
      <Icon type="logout" />
      登出
    </Menu.Item>
  </Menu>
);


class Home extends React.Component<IRouter, IIndexState> {

  constructor(props: any) {
    super(props)
    this.state = {
      user: {}
    }
  }

  public async componentWillMount() {
    await this.getMe()
  }

  public getMe = async () => {
    const response = await axios.get('me');
    this.setState({ user: response.data })
  }

  public render() {
    return (
      <div className="Home" id="Home">
        <header>
          <span className="logo">LOGO</span>
          <Dropdown overlay={menu}>
            <span>
              {this.state.user && this.state.user.account}
              <Icon type="down" style={{marginLeft: 8}} />
            </span>
          </Dropdown>
        </header>
        <main>
          <Todos/>
        </main>
      </div>
    );
  }
}

export default Home;