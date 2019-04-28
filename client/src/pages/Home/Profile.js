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
    this.handleEdit = this.handleEdit.bind(this);

    let description;

    if (this.props.location.state === undefined) {
      description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        facere dicta sapiente numquam voluptate iure deleniti veritatis odit
        veniam non nobis provident exercitationem autem, quam nesciunt
        quisquam odio asperiores dignissimos.`;
      this.state = {
        editMode: false,
        name: "placeholder for name",
        email: "placeholder for email",
        dateOfBirth: "placeholder for DOB",
        interest: [],
        skill: [],
        description: description,
      };
    } else {
      if (this.props.location.state.description === undefined) {
        description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        facere dicta sapiente numquam voluptate iure deleniti veritatis odit
        veniam non nobis provident exercitationem autem, quam nesciunt
        quisquam odio asperiores dignissimos.`;
      } else {
        description = this.props.location.state.description;
      }
      this.state = {
        editMode: false,
        name: `${this.props.location.state.LastName} ${
          this.props.location.state.FirstName
        }`,
        email: this.props.location.state.email,
        dateOfBirth: this.props.location.state.DOB,
        interest: this.props.location.state.userInterest,
        skill: this.props.location.state.userSkill,
        description: description,
      };
    }
  }

  // handle if edit is clicked
  handleEdit() {
    this.setState({
      editMode: true,
    });
  }

  render() {
    if (this.state.editMode) {
      return (
        <Redirect
          exact
          to={{
            pathname: "/home/profile_edit",
            state: this.state,
          }}
        />
      );
    }

    return (
      <section className={styles.profile}>
        <div className={styles.avatarEdit}>
          <Avatar name={this.state.name} />
          <Button className={styles.button} onClick={this.handleEdit}>
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
        <p className={styles.description}>{this.state.description}</p>
      </section>
    );
  }
}

export default Profile;
