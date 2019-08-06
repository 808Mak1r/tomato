import * as React from 'react';
// tslint:disable-next-line: ordered-imports
import {Route, Router} from 'react-router-dom'
import Home from './components/Home/Home'
// tslint:disable-next-line: ordered-imports
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import history from './config/history'

class App extends React.Component{

	public render(){
		return (
			<Router history={history}>
				<div>
					<Route exact={true} path="/" component={Home}/>
					<Route path="/login" component={Login}/>
					<Route path="/signUp" component={SignUp}/>
				</div>
			</Router>
		)
	}
}

export default App