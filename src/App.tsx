import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';
import Index from './components/Index/Index';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SginUp';


function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact={true} component={Index} />
        <Route path="/login" component={Login} />
        <Route path="/signUp" component={SignUp} />
      </div>
    </Router>
  );
}

export default App
