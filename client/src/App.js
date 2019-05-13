import React, { Component } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// List of available pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InvalidInfo from "./pages/InvalidInfo";
import ListSkill from "./pages/ListSkill";
import Home from "./pages/Home";
import Guideline from "./pages/Guideline";
import VerificationPass from "./pages/VerificationPass";
import VerificationFail from "./pages/VerificationFail";
import OthersProfile from "./pages/OthersProfile";
import PageNotFound from "./pages/PageNotFound";
import CreateAppointment from "./pages/CreateAppointment";
import CreateFeedback from "./pages/CreateFeedback";

const mapStateToProps = state => {
  return {
    state: state,
  };
};

class App extends Component {
  render() {
    if (this.props.state.loggedIn === false) {
      return (
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/create_feedback" component={CreateFeedback} />
            <Route path="/signup" component={Signup} />
            <Route path="/invalid_info" component={InvalidInfo} />
            <Route path="/list_skill" component={ListSkill} />
            <Route path="/verification/pass" component={VerificationPass} />
            <Route path="/verification/fail" component={VerificationFail} />
            <Route path="/page_not_found" component={PageNotFound} />
            <Redirect to="/page_not_found" />
          </Switch>
        </div>
      );
    }
    return (
      <div className="App">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/guideline" component={Guideline} />
          <Route path="/page_not_found" component={PageNotFound} />
          <Route
            path="/user/create_appointment"
            component={CreateAppointment}
          />
          <Route exact path="/user" component={OthersProfile} />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
