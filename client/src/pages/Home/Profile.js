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
    // setting state
    this.state = {
      editMode: false,
      name: "",
      email: "",
      dateOfBirth: "",
      interest: [],
      skill: [],
      description: "",
    };

    // if props is undefined, put placeholders
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
      // if description is undefined put placeholders
      if (
        this.props.location.state.description === undefined ||
        this.props.location.state.description === ""
      ) {
        description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        facere dicta sapiente numquam voluptate iure deleniti veritatis odit
        veniam non nobis provident exercitationem autem, quam nesciunt
        quisquam odio asperiores dignissimos.`;
      } else {
        description = this.props.location.state.description;
      }
    }
  }


  componentDidMount = async () => {
    const profileData = await fetch(
      `http://localhost:5000/api/user/${this.props.location.state.id}`
    );
    const profile = await profileData.json();
    var dateData = new Date(profile.DOB);
    var date = `${dateData.getDate()}/${dateData.getMonth() +
      1}/${dateData.getFullYear()}`;
    this.setState({
      name: `${profile.FirstName} ${profile.LastName}`,
      email: this.props.location.state.email,
      dateOfBirth: date,
      //TODO: add description field
    });
    var skillIds = profile.Skills.map(data => {
      return data.Skill;
    }).join(",");
    var interestsIds = profile.Interests.map(data => {
      return data.Skill;
    }).join(",");
    const skillData = await fetch(
      `http://localhost:5000/api/skill?id=${skillIds}`
    );
    const skills = await skillData.json();
    const interestsData = await fetch(
      `http://localhost:5000/api/skill?id=${interestsIds}`
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
