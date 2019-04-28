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
    this.handleFetch = this.handleFetch.bind(this);
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

      if (this.props.location.state.noBackend) {
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
        console.log(this.state);
      } else {
        this.handleFetch(description);
      }
    }
  }

  handleFetch(description) {
    if (this.props.location.state.noBackend) return;
    // fetching user data from express server
    fetch("http://localhost:5000/api/credential", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Credentials: this.props.id,
      }),
    })
      .then(resp => {
        console.log(resp);
        return resp.json();
      })
      .then(data => {
        var d = new Date(data.DOB);
        this.setState({
          // editMode: true,
          name: data.FirstName + " " + data.LastName,
          dateOfBirth:
            d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(),
          interest: [
            {
              level: "Beginner",
              value: "Algorithms",
            },
            {
              level: "Advanced",
              value: "Cooking",
            },
          ],
          skill: [
            {
              level: "Advanced",
              value: "Dancing",
            },
            {
              level: "Intermediate",
              value: "Data Structure",
            },
          ],
          description: description,
          email: this.props.location.state.email,
        });
      });
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
