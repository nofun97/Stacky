// /client/App.js
import React, { Component } from "react";

import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import InvalidInfo from './pages/InvalidInfo';
import ListSkill from './pages/ListSkill';
import Home from './pages/Home';
import Guideline from './pages/Guideline';
import VerificationPass from './pages/VerificationPass';
import VerificationFail from './pages/VerificationFail';
import OthersProfile from './pages/OthersProfile';
import PageNotFound from './pages/PageNotFound';
import CreateAppointment from './pages/CreateAppointment';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/"  component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/invalid_info" component={InvalidInfo} />
          <Route path="/list_skill" component={ListSkill} />
          <Route path="/home" component={Home} />
          <Route path="/guideline" component={Guideline} />
          <Route path="/verification/pass" component={VerificationPass} />
          <Route path="/verification/fail" component={VerificationFail} />
          <Route path="/page_not_found" component={PageNotFound} />
          <Route path="/user/create_appointment" component={CreateAppointment} />
          {/* Route for other people profile */}
          <Route exact path="/user" component={OthersProfile} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;