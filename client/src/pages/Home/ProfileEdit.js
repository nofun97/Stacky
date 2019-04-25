import React, { Component } from "react";
// https://github.com/Sitebase/react-avatar
import Avatar from "react-avatar";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import InterestEditorList from "../../components/InterestEditorList";
import styles from "../../styles/pages/Home/ProfileEdit.module.css";

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      submitted: false,
      editMode: false,
      name: "Tester man",
      email: "abc@abc.com",
      dateOfBirth: "2019-04-04",
      interestOption: [
        { value: "a", label: "a" },
        { value: "b", label: "b" },
        { value: "c", label: "c" },
      ],
      skillOption: [
        { value: "a", label: "a" },
        { value: "b", label: "b" },
        { value: "c", label: "c" },
      ],
      selectedInterest: [{ value: "a", level: "Intermediate", id: "a" }],
      selectedSkill: [{ value: "Algorithm", level: "Advanced", id: "sdsdsd" }],
    };
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  // The value of input date is in "2019-04-04" format
  handleDateChange(event) {
    this.setState({ dateOfBirth: event.target.value });
  }

  // Handler for slider change
  handleSliderChange() {}

  handleSubmit() {
    this.setState({ submitted: true })
  }

  render() {
    if(this.state.submitted === true){
      return <Redirect to="/home/profile"/>;
    }

    return (
      <section className={styles.profile}>
        <div className={styles.avatarEdit}>
          <Avatar
            name={this.state.name}
            onClick={() => {
              console.log("clicked");
            }}
          />
          <p className={styles.edit}>Edit Mode</p>
        </div>
        <h3 className={styles.subheader}>Name</h3>
        <input
          className={styles.input}
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <h3 className={styles.subheader}>Email</h3>
        <input
          className={styles.input}
          type="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <h3 className={styles.subheader}>Date of Birth</h3>
        <input
          className={styles.input}
          type="date"
          value={this.state.dateOfBirth}
          onChange={this.handleDateChange}
        />
        <h3 className={styles.subheader}>Interests</h3>
        <section className={styles.listing}>
          <Select
            className={styles.select}
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            name="interest"
            options={this.state.interestOption}
            onChange={() => {}}
          />
          <Button className={styles["add-button"]}>Add</Button>
          <InterestEditorList
            handleSliderChange={this.handleSliderChange}
            handleRemove={this.handleRemove}
            type="Interest"
            className={styles.editors}
            values={this.state.selectedInterest}
          />
        </section>
        <h3 className={styles.subheader}>Skills</h3>
        <section className={styles.listing}>
          <Select
            className={styles.select}
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            name="skill"
            options={this.state.skillOption}
            onChange={() => {}}
          />
          <Button className={styles["add-button"]}>Add</Button>
          <InterestEditorList
            handleSliderChange={this.handleSliderChange}
            handleRemove={this.handleRemove}
            type="Skill"
            className={styles.editors}
            values={this.state.selectedSkill}
          />
        </section>
        <h3 className={styles.subheader}>Description</h3>
        <p>Write a little bit about yourself.</p>
        <textarea
          rows="10"
          className={styles.textarea}
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <Button
          className={styles["btn-secondary"]}
          variant="primary"
          onClick={this.handleSubmit}
        >
          Confirm
        </Button>
      </section>
    );
  }
}

export default ProfileEdit;
