import React, { Component } from "react";
import { connect } from "react-redux";
// https://github.com/Sitebase/react-avatar
import Avatar from "react-avatar";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import InterestDisplayList from "../../components/InterestDisplayList";
import styles from "../../styles/pages/Home/Profile.module.css";

const mapStateToProps = state => {
  return {
    state: state,
  };
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    // setting state
    this.state = {
      editMode: false,
      name: "",
      email: "",
      dateOfBirth: "",
      interest: [],
      skill: [],
      firstName: "",
      lastName: "",
      description: "",
    };
  }

  componentDidMount = async () => {
    const profileData = await fetch(
      `http://localhost:5000/api/user/${this.props.state.user._id}`,
      {
        credentials: "include",
      }
    );

    const profile = await profileData.json();
    var dateData = new Date(profile.DOB);
    var date = `${dateData.getDate()}/${dateData.getMonth() +
      1}/${dateData.getFullYear()}`;
    this.setState({
      firstName: profile.FirstName,
      lastName: profile.LastName,
      name: `${profile.FirstName} ${profile.LastName}`,
      email: profile.Email,
      dateOfBirth: date,
      skill: profile.Skills.map(data => {
        return { level: data.Level, value: data.Name, id: data.Skill };
      }),
      interest: profile.Interests.map(data => {
        return { level: data.Level, value: data.Name, id: data.Skill };
      }),
      description: profile.Description,
    });
    this.props.dispatch({ type: "USER_ADD_SKILL", skills: profile.Skills });
    this.props.dispatch({
      type: "USER_ADD_INTEREST",
      interests: profile.Interests,
    });
  };

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
            state: {
              ...this.state,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
            },
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

export default connect(mapStateToProps)(Profile);
