import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
// https://github.com/chacestew/react-router-tabs
import { NavTab } from "react-router-tabs";
// https://github.com/Sitebase/react-avatar
import Avatar from "react-avatar";
import { connect } from "react-redux";

import "../styles/components/HomeTab.css";
import styles from "../styles/pages/Home.module.css";

import Dashboard from "./Home/Dashboard";
import Profile from "./Home/Profile";
import ProfileEdit from "./Home/ProfileEdit";
import Chat from "./Home/Chat";
import Search from "./Home/Search";
import AllAppointment from "./Home/AllAppointment";
import AllFeedback from "./Home/AllFeedback";

const mapStateToProps = state => {
  return {
    state: state,
  };
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "My Home",
      email: this.props.state.user.Email,
      id: this.props.state.user._id,
      FirstName: this.props.state.user.FirstName,
      LastName: this.props.state.user.LastName,
      DOB: "",
      interest: [],
      skill: [],
    };

    this.updateWindow = this.updateWindow.bind(this);
  }

  updateWindow() {
    this.setState({});
  }

  // for responsiveness of the avatar
  componentDidMount() {
    window.addEventListener("resize", this.updateWindow);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindow);
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
    let name = `${this.props.state.user.FirstName} ${
      this.props.state.user.LastName
    }`;
    if (window.innerWidth <= 426) {
      avatar = (
        <div>
          <Avatar
            size="50px"
            className={styles.avatar}
            name={name}
            round={true}
          />
        </div>
      );
    } else if (window.innerWidth <= 895 && window.innerWidth > 426) {
      avatar = (
        <section>
          <Avatar
            size="70px"
            className={styles.avatar}
            name={name}
            round={true}
          />
        </section>
      );
    } else {
      avatar = (
        <Avatar
          size="100px"
          className={styles.avatar}
          name={name}
          round={true}
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
              <div className={styles.guidelines}>Guidelines</div>
            </Link>
          </div>
          <div className={styles.tab}>
            {/* For front-end mockup purposes we pass data through navigation */}
            <NavTab
              to={{
                pathname: "/home/profile",
              }}
            >
              Profile
            </NavTab>
            <NavTab exact to={{ pathname: "/home" }}>
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
          <Route
            path="/home/search"
            render={props => (
              <Search
                {...props}
                id={this.state.id}
                firstName={this.state.FirstName}
                lastName={this.state.LastName}
              />
            )}
          />
          <Route
            path="/home/appointments"
            render={props => <AllAppointment {...props} id={this.state.id} />}
          />
          <Route
            path="/home/feedbacks"
            render={props => <AllFeedback {...props} id={this.state.id} />}
          />
          <Redirect exact to="/home" />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
