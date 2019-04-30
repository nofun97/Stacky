import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Avatar from "react-avatar";
import InterestDisplayList from "../components/InterestDisplayList";
import { Link } from "react-router-dom";

import styles from "../styles/pages/OthersProfile.module.css";

class OthersProfile extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      firstName: "Frisco",
      lastName: "Saol",
      description: "pro football player",
      skill: [{value: "Juggling", level: "Expert", id: "909"}, {value: "Shuffling", level: "Expert", id: "9010"}],
      interest:  [{value: "Baking", level: "Beginner", id: "11"}, {value: "Algorithm", level: "Intermediate", id: "89"}],
    }
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    let name = `${this.state.firstName} ${this.state.lastName}`;

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
          <h1>Options</h1>
          <Link to="/user/appointment" className={styles.suboption}>
            <h2>Set Appointment</h2>
          </Link>
          <h2 className={styles.suboption}>Feedback</h2>
          <h2 className={styles.suboption}>Block</h2>
          <h2 className={styles.suboption}>Report</h2>
        </aside>

        <section className={styles.profile}>
          <Avatar name={name} round={true} />
          <h3 className={styles.subheader}>Name</h3>
          <p className={styles.oneliner}>{name}</p>
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
