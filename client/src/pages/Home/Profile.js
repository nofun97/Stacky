import React, { Component } from "react";
// https://github.com/Sitebase/react-avatar
import Avatar from "react-avatar";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import InterestDisplayList from "../../components/InterestDisplayList";
import styles from "../../styles/pages/Home/Profile.module.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      editMode: false,
      name: "Tester man",
      email: "abc@abc.com",
      dateOfBirth: "2019-04-04",
      interest: [{ value: "a", level: "Intermediate", id: "a" }],
      skill: [{ value: "Algorithm", level: "Advanced", id: "sdsdsd" }],
    };
  }

  handleSubmit() {
    this.setState({
      editMode: true,
    });
  }
  // Get all the state before mount

  render() {
    if (this.state.editMode) {
      return <Redirect exact to="/home/profile_edit"/>;
    }

    return (
      <section className={styles.profile}>
        <div className={styles.avatarEdit}>
          <Avatar name={this.state.name} />
          <Button className={styles.button} onClick={this.handleSubmit}>
            <p className={styles.edit}>Edit</p>
          </Button>
        </div>
        <h3 className={styles.subheader}>Name</h3>
        <p className={styles.oneliner}>{this.state.name}</p>
        <h3 className={styles.subheader}>Email</h3>
        <p className={styles.oneliner}>{this.state.email}</p>
        <h3 className={styles.subheader}>Date of Birth</h3>
        <p className={styles.oneliner}>{this.state.dateOfBirth}</p>

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
        <h3 className={styles.subheader}>Description</h3>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          facere dicta sapiente numquam voluptate iure deleniti veritatis odit
          veniam non nobis provident exercitationem autem, quam nesciunt
          quisquam odio asperiores dignissimos.
        </p>
      </section>
    );
  }
}

export default Profile;
