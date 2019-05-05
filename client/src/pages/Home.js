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
import ProfileEdit from "./Home/ProfileEdit";
import Chat from "./Home/Chat";
import Search from "./Home/Search";
import AllAppointment from "./Home/AllAppointment";

class Home extends Component {
  constructor(props) {
    super(props);

    if (this.props.location.state === undefined) {
      this.state = {
        page: "My Home",
        username: "Username placeholder",
        email: "Email placeholder",
        id: "id placeholder",
        FirstName: "",
        LastName: "",
        DOB: "",
        interest: [],
        skill: []
      };
    } else {
      this.state = {
        page: "My Home",
        username: "Tester Man",
        email: this.props.location.state.email,
        id: this.props.location.state.id,
        FirstName: "",
        LastName: "",
        DOB: "",
        interest: [],
        skill: []
      };
    }

    console.log(this.state);
  }

  render() {
    // to change header title depending on path
    let pageName;
    switch (this.props.location.pathname) {
      case "/home":
        pageName = "My Home";
        break;

      case "/home/profile":
        pageName = "My Profile";
        break;

      case "/home/search":
        pageName = "Find People";
        break;

      // To be implemented later
      case "/home/chat":
        pageName = "My Home";
        break;

      default:
        pageName = "My Home";
        break;
    }

    let avatar;
    if (window.innerWidth <= 426) {
      avatar = (
        <div>
          <Avatar
            size="50px"
            className={styles.avatar}
            name={this.state.username}
            round={true}
            src="http://gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3"
          />
          />
        </div>
      );
    } else {
      avatar = (
        <Avatar
          size="100px"
          className={styles.avatar}
          name={this.state.username}
          round={true}
          src="http://gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3"
        />
      );
    }
    
    return (
      <div>
        <header className={styles.header}>
          {/* Change the avatar src with user picture */}
          {avatar}
          <div className={styles.title}>
            <h1 className={styles["page-title"]}>{pageName}</h1>
            {/* Implement link to guideline page */}
            <Link to="/guideline">
              <p className={styles.guidelines}>Guidelines</p>
            </Link>
          </div>
          <div className={styles.tab}>
            {/* For front-end mockup purposes we pass data through navigation */}
            <NavTab
              to={{
                pathname: "/home/profile",
                state: {
                  ...this.props.location.state
                }
              }}
            >
              Profile
            </NavTab>
            <NavTab
              exact
              to={{ pathname: "/home", state: this.props.location.state }}
            >
              My Home
            </NavTab>
            <NavTab disabled to="/home/chat">
              Chat
            </NavTab>
            <NavTab to="/home/search">Search</NavTab>
          </div>
        </header>
        <hr className={styles.line} />
        <Switch>
          <Route exact path="/home" component={Dashboard} />
          <Route
            path="/home/profile"
            render={props => (
              <Profile
                {...props}
                id={this.state.id}
                email={this.state.email}
                name={this.state.FirstName + " " + this.state.LastName}
                dateOfBirth={this.state.DOB}
                interest={this.state.interest}
                skill={this.state.skill}
              />
            )}
            // component={Profile}
          />
          <Route path="/home/profile_edit" component={ProfileEdit} />
          <Route path="/home/chat" component={Chat} />
          <Route path="/home/search" component={Search} />
          <Route path="/home/appointments" component={AllAppointment} />
          <Redirect exact to="/home" />
        </Switch>
      </div>
    );
  }
}

export default Home;
