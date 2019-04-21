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

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/"  component={Landing} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;