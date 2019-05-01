// /client/App.js
import React, { Component } from "react";

import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Landing from './pages/Landing';
import About from './components/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import InvalidInfo from './pages/InvalidInfo';
import ListSkill from './pages/ListSkill';
import Home from './pages/Home';
import Guideline from './pages/Guideline';
import VerificationPass from './pages/VerificationPass';
import VerificationFail from './pages/VerificationFail';
import OthersProfile from './pages/OthersProfile';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/"  component={Landing} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/invalid_info" component={InvalidInfo} />
          <Route path="/list_skill" component={ListSkill} />
          <Route path="/home" component={Home} />
          <Route path="/guideline" component={Guideline} />
          <Route path="/verification/pass" component={VerificationPass} />
          <Route path="/verification/fail" component={VerificationFail} />
          {/* Route for other people profile */}
          <Route path="/user" component={OthersProfile} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;