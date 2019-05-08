import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Avatar from "react-avatar";
import InterestDisplayList from "../components/InterestDisplayList";
import { Link, Redirect } from "react-router-dom";

import styles from "../styles/pages/OthersProfile.module.css";

class OthersProfile extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    console.log("Others Profile");
    console.log(this.props.location.state);
    this.state = {
      name: "",
      firstName: "",
      lastName: "",
      description: "Hello I'm new to Skill tree",
      skill: [],
      interest: [],
      id: this.props.location.state.id,
    };
  }

  componentDidMount = async () => {
    const profileData = await fetch(
      `http://localhost:5000/api/user/${this.props.location.state.id}`,
      {
        credentials: "include",
      }
    );
    const profile = await profileData.json();
    this.setState({
      lastName: profile.LastName,
      firstName: profile.FirstName,
      name: `${profile.FirstName} ${profile.LastName}`,
      //TODO: add description field
    });
    var skillIds = profile.Skills.map(data => {
      return data.Skill;
    }).join(",");
    var interestsIds = profile.Interests.map(data => {
      return data.Skill;
    }).join(",");
    const skillData = await fetch(
      `http://localhost:5000/api/skill?id=${skillIds}`,
      {
        credentials: "include",
      }
    );
    const skills = await skillData.json();
    const interestsData = await fetch(
      `http://localhost:5000/api/skill?id=${interestsIds}`,
      {
        credentials: "include",
      }
    );
    const interests = await interestsData.json();

    var skillProfile = profile.Skills.map(data => {
      for (var i = 0; i < skills.length; i++) {
        if (data.Skill === skills[i]._id) {
          return { level: data.Level, value: skills[i].Name, id: data.Skill };
        }
      }
      return {};
    }).filter(data => {
      return data !== {};
    });
    var interestsProfile = profile.Interests.map(data => {
      for (var i = 0; i < interests.length; i++) {
        if (data.Skill === interests[i]._id) {
          return {
            level: data.Level,
            value: interests[i].Name,
            id: data.Skill,
          };
        }
      }
      return {};
    }).filter(data => {
      return data !== {};
    });
    this.setState({ interest: interestsProfile, skill: skillProfile });
  };

  goBack() {
    this.props.history.goBack();
  }

  render() {
    /* for later when it's connected to backend need to uncomment to block people from accessing the route */
    if (this.props.location.state === undefined) {
      return <Redirect to="/page_not_found" />;
    }

    let avatar;
    if (window.innerWidth <= 426) {
      avatar = (
        <div>
          <Avatar
            size="60px"
            className={styles.avatar}
            name={this.state.name}
            round={true}
          />
        </div>
      );
    } else {
      avatar = (
        <Avatar className={styles.avatar} name={this.state.name} round={true} />
      );
    }

    return (
      <div className={styles.layout}>
        <aside className={styles.options}>
          {/* specify fontSize (icon size) here */}
          <IconButton
            color="inherit"
            style={{ fontSize: "30px" }}
            onClick={this.goBack}
          >
            <ArrowBackIcon fontSize="inherit" />
            Back
          </IconButton>
          <h1 className={styles.option}>Options</h1>
          <Link
            to={{
              pathname: "/user/create_appointment",
              state: {
                InviteeFirstName: this.state.firstName,
                InviteeLastName: this.state.lastName,
                InviteeID: this.state.id,
                CreatorID: this.props.location.state.userID,
                CreatorFirstName: this.props.location.state.userFirstName,
                CreatorLastName: this.props.location.state.userLastName,
              },
            }}
          >
            <h2 className={styles.suboption}>Set Appointment</h2>
          </Link>
          <h2 className={styles.suboption}>Feedback</h2>
          <h2 className={styles.suboption}>Block</h2>
          <h2 className={styles.suboption}>Report</h2>
        </aside>

        <section className={styles.profile}>
          {avatar}
          <h3 className={styles.subheader}>Name</h3>
          <p className={styles.oneliner}>{this.state.name}</p>
          <h3 className={styles.subheader}>Description</h3>
          <p className={styles.description}>{this.state.description}</p>
          <h3 className={styles.subheader}>Interests</h3>
          <InterestDisplayList
            type="Interest"
            values={this.state.interest}
            className={styles.interestDisplay}
          />
          <h3 className={styles.subheader}>Skills</h3>
          <InterestDisplayList
            type="Skill"
            values={this.state.skill}
            className={styles.interestDisplay}
          />
        </section>
      </div>
    );
  }
}

export default OthersProfile;
