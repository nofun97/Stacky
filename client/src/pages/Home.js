import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
// https://github.com/chacestew/react-router-tabs
import { NavTab } from "react-router-tabs";
// https://github.com/Sitebase/react-avatar
import Avatar from "react-avatar";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";

import "../styles/components/HomeTab.css";
import styles from "../styles/pages/Home.module.css";

import Dashboard from "./Home/Dashboard";
import Profile from "./Home/Profile";
import ProfileEdit from "./Home/ProfileEdit";
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
          {/* Change the avatar src with user picture */}
          <Avatar
            name={this.state.username}
            round={true}
            size="100px"
            className={styles.avatar}
            src="http://gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3"
          />
          <div className={styles.title}>
            <h1 className={styles["page-title"]}>{this.state.page}</h1>
            {/* Implement link to guideline page */}
            <Link to="/home">
              <p className={styles.guidelines}>Guidelines</p>
            </Link>
          </div>
          <div className={styles.tab}>
            {/* <Navbar collapseOnSelect expand="lg" bg="light">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/home/profile">Profile</Nav.Link>
                  <Nav.Link href="/home">My Home</Nav.Link>
                  <Nav.Link href="/home/chat">Chat</Nav.Link>
                  <Nav.Link href="/home/search">Search</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar> */}
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
        <hr className={styles.line} />
        <Switch>
          <Route exact path="/home" component={Dashboard} />
          <Route path="/home/profile" component={Profile} />
          <Route path="/home/profile_edit" component={ProfileEdit} />
          <Route path="/home/chat" component={Chat} />
          <Route path="/home/search" component={Search} />
          <Redirect exact to="/home" />
        </Switch>
      </div>
    );
  }
}

export default Home;
