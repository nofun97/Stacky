import React, { Component } from "react";
import { connect } from "react-redux";
// https://github.com/Sitebase/react-avatar
import Avatar from "react-avatar";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import InterestEditorList from "../../components/InterestEditorList";
import styles from "../../styles/pages/Home/ProfileEdit.module.css";

const mapStateToProps = state => {
  return {
    state: state,
  };
};

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddInterest = this.handleAddInterest.bind(this);
    this.handleAddSkill = this.handleAddSkill.bind(this);
    this.handleSkillSelect = this.handleSkillSelect.bind(this);
    this.handleInterestSelect = this.handleInterestSelect.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      submitted: false,
      firstName: this.props.state.user.FirstName,
      lastName: this.props.state.user.LastName,
      name: `${this.props.state.user.FirstName} ${
        this.props.state.user.LastName
      }`,
      email: this.props.state.user.Email,
      dateOfBirth: this.props.state.user.DOB.slice(0, 10),
      interestOption: [],
      skillOption: [],
      selectedInterest: null,
      selectedSkill: null,
      userInterest: this.props.state.user.Interests,
      userSkill: this.props.state.user.Skills,
      description: this.props.location.state.description,
    };
    console.log(this.state);
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/skill", {
      credentials: "include",
    })
      .then(resp => resp.json())
      .then(data => {
        for (var i = 0; i < data.length; i++) {
          this.setState({
            interestOption: [
              ...this.state.interestOption,
              { value: data[i]._id, label: data[i].Name },
            ],
            skillOption: [
              ...this.state.skillOption,
              { value: data[i]._id, label: data[i].Name },
            ],
          });
        }
      });
  }

  // handle name change
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  // handle email change
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  // handle DOB change ,The value of input date is in "2019-04-04" format
  handleDateChange(event) {
    this.setState({ dateOfBirth: event.target.value });
  }

  // handle description change
  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  // handler for the thing selected for interest
  handleInterestSelect(value) {
    if (value !== null) {
      this.setState({
        selectedInterest: {
          value: value.label,
          level: "Beginner",
          id: value.value,
          label: value.label,
        },
      });
    } else {
      this.setState({
        selectedInterest: null,
      });
    }
  }

  // handler for thing selected for skill
  handleSkillSelect(value) {
    if (value !== null) {
      this.setState({
        selectedSkill: {
          value: value.label,
          level: "Intermediate",
          id: value.value,
          label: value.label,
        },
      });
    } else {
      this.setState({
        selectedSkill: null,
      });
    }
  }

  // handler when interest add button is clicked (need to remove the option from the select)
  handleAddInterest() {
    if (this.state.selectedInterest !== null) {
      let option = this.state.interestOption.filter(
        opt => opt.value !== this.state.selectedInterest.value
      );
      let userInterest = [
        this.state.selectedInterest,
        ...this.state.userInterest,
      ];
      this.setState({
        interestOption: option,
        userInterest: userInterest,
        selectedInterest: null,
      });
    }
    console.log(this.state);
  }

  // handler when skill add button is clicked (need to remove the option from the select)
  handleAddSkill() {
    if (this.state.selectedSkill !== null) {
      let option = this.state.skillOption.filter(
        opt => opt.value !== this.state.selectedSkill.value
      );
      let userSkill = [this.state.selectedSkill, ...this.state.userSkill];
      this.setState({
        skillOption: option,
        userSkill: userSkill,
        selectedSkill: null,
      });
    }
  }

  // handler for changes in slider of the interest
  handleSliderChange(sliderValue, type, keyValue) {
    var level = 0;

    if (type === "Interest") {
      switch (sliderValue) {
        case 0:
          level = "Beginner";
          break;

        case 50:
          level = "Intermediate";
          break;

        case 100:
          level = "Advanced";
          break;

        default:
          level = "Beginner";
      }
      let interestArray = this.state.userInterest;
      for (let interest of interestArray) {
        if (interest.value === keyValue) {
          interest.level = level;
        }
      }
      this.setState({ userInterest: interestArray });
    } else if (type === "Skill") {
      switch (sliderValue) {
        case 0:
          level = "Intermediate";
          break;

        case 50:
          level = "Advanced";
          break;

        case 100:
          level = "Expert";
          break;

        default:
          level = "Intermediate";
      }
      let skillArray = this.state.userSkill;
      for (let skill of skillArray) {
        if (skill.value === keyValue) {
          skill.level = level;
        }
      }
      this.setState({ userSkill: skillArray });
    }
  }

  // handler when the interest is removed (need to add the option back to the select)
  handleRemove(value, type) {
    console.log(value, type);
    if (type === "Interest") {
      let userInterest = this.state.userInterest.filter(
        opt => opt.value !== value
      );
      let option = [
        { value: value, label: value },
        ...this.state.interestOption,
      ];
      this.setState({
        userInterest: userInterest,
        interestOption: option,
      });
    } else if (type === "Skill") {
      let userSkill = this.state.userSkill.filter(opt => opt.value !== value);
      let option = [{ value: value, label: value }, ...this.state.skillOption];
      this.setState({
        userSkill: userSkill,
        skillOption: option,
      });
    }
  }

  handleSubmit() {
    let newSkills = this.state.userSkill.map(data => {
      return { Skill: data.id, Level: data.level };
    });
    let newInterests = this.state.userInterest.map(data => {
      return { Skill: data.id, Level: data.level };
    });
    fetch(`http://localhost:5000/api/user/${this.props.state.user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(this.state.Submission)
      body: JSON.stringify({
        Email: this.state.email,
        FirstName: this.state.firstName,
        LastName: this.state.lastName,
        DOB: this.state.dateOfBirth,

        //TODO: implement this on the sign up form
        UName: this.state.UName,
        Address: this.state.Address,
        Skills: newSkills,
        Interests: newInterests,
      }),
      credentials: "include",
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log("Submission successful!");
        let userUpdate = {
          Email: this.state.email,
          FirstName: this.state.firstName,
          LastName: this.state.lastName,
          DOB: this.state.dateOfBirth,

          //TODO: implement this on the sign up form
          UName: this.state.UName,
          Address: this.state.Address,
          Skills: newSkills,
          Interests: newInterests,
        };
        this.props.dispatch({type: "USER_AUTH", user: userUpdate});
        this.setState({ submitted: true });
      })
      .catch(err => {
        console.log("Submission not succesful");
        console.log(err);
        this.setState({
          InvalidInfo: true,
        });
      });
  }

  render() {
    if (this.state.submitted === true) {
      return (
        <Redirect
          to={{
            pathname: "/home/profile",
          }}
        />
      );
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
        <h3 className={styles.subheader}>First Name</h3>
        <input
          className={styles.input}
          type="text"
          value={this.state.firstName}
          onChange={e => this.setState({ firstName: e.target.value })}
        />
        <h3 className={styles.subheader}>Last Name</h3>
        <input
          className={styles.input}
          type="text"
          value={this.state.lastName}
          onChange={e => this.setState({ lastName: e.target.value })}
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
            value={this.state.selectedInterest}
            name="interest"
            options={this.state.interestOption}
            onChange={this.handleInterestSelect}
          />
          <Button
            className={styles["add-button"]}
            onClick={this.handleAddInterest}
          >
            Add
          </Button>
          <InterestEditorList
            handleSliderChange={this.handleSliderChange}
            handleRemove={this.handleRemove}
            type="Interest"
            className={styles.editors}
            values={this.state.userInterest}
          />
        </section>
        <h3 className={styles.subheader}>Skills</h3>
        <section className={styles.listing}>
          <Select
            className={styles.select}
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            value={this.state.selectedSkill}
            name="skill"
            options={this.state.skillOption}
            onChange={this.handleSkillSelect}
          />
          <Button
            className={styles["add-button"]}
            onClick={this.handleAddSkill}
          >
            Add
          </Button>
          <InterestEditorList
            handleSliderChange={this.handleSliderChange}
            handleRemove={this.handleRemove}
            type="Skill"
            className={styles.editors}
            values={this.state.userSkill}
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
          className={styles["submit-button"]}
          variant="primary"
          onClick={this.handleSubmit}
        >
          Confirm
        </Button>
      </section>
    );
  }
}

export default connect(mapStateToProps)(ProfileEdit);
