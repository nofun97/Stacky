import React, { Component } from "react";
// https://github.com/Sitebase/react-avatar
import Avatar from "react-avatar";
import Button from "@material-ui/core/Button";

import styles from "../../styles/pages/Home/Profile.module.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      name: "Tester man",
      email: "abc@abc.com",
      dateOfBirth: new Date().toLocaleDateString(),
    };
  }

  // Get all the state before mount

  render() {
    if (this.state.editMode) {
      return <h1>editMode</h1>;
    }

    return (
      <section className={styles.profile}>
        <Avatar name={this.state.name} />
        <Button>
          <p className={styles.edit}>Edit</p>
        </Button>
        <h3 className={styles.subheader}>Name</h3>
        <p className={styles.oneliner}>{this.state.name}</p>
        <h3 className={styles.subheader}>Email</h3>
        <p className={styles.oneliner}>{this.state.email}</p>
        <h3 className={styles.subheader}>Date of Birth</h3>
        <p className={styles.oneliner}>{this.state.dateOfBirth}</p>

        <h3 className={styles.subheader}>Interests</h3>

        <h3 className={styles.subheader}>Skills</h3>

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
