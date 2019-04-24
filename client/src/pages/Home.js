import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
// https://github.com/chacestew/react-router-tabs
import { NavTab } from "react-router-tabs";
// https://github.com/Sitebase/react-avatar
import Avatar from "react-avatar";
import "../styles/components/HomeTab.css";
import styles from "../styles/pages/Home.module.css";

import Dashboard from "./Home/Dashboard";
import Profile from "./Home/Profile";
import Chat from "./Home/Chat";
import Search from "./Home/Search";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "My Home",
      username: "Tester Man",
    };
  }
  render() {
    return (
      <div>
        <header className={styles.header}>
          <Avatar
            name={this.state.username}
            round={true}
            size="100px"
            className={styles.avatar}
          />
          <div className={styles.title}>
            <h1 class={styles["page-title"]}>{this.state.page}</h1>
            {/* Implement link to guideline page */}
            <Link to="/home">
              <p class={styles.guidelines}>Guidelines</p>
            </Link>
          </div>
          <div className={styles.tab}>
            <NavTab to="/home/profile">Profile</NavTab>
            <NavTab exact to="/home">
              My Home
            </NavTab>
            <NavTab disabled to="/home/chat">
              Chat
            </NavTab>
            <NavTab disabled to="/home/search">
              Search
            </NavTab>
          </div>
        </header>
        <hr class={styles.line} />
        <Switch>
          <Route exact path="/home" component={Dashboard} />
          <Route path="/home/profile" component={Profile} />
          <Route path="/home/chat" component={Chat} />
          <Route path="/home/search" component={Search} />
          <Redirect exact to="/home" />
        </Switch>
      </div>
    );
  }
}

export default Home;
