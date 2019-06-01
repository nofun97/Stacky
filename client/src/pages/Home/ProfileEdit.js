import React, { Component } from "react";
import { connect } from "react-redux";
// https://github.com/Sitebase/react-avatar
import Avatar from "react-avatar";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import InterestEditorList from "../../components/InterestEditorList";
import styles from "../../styles/pages/Home/ProfileEdit.module.css";

const mapStateToProps = state => {
  return {
    state: state,
  };
};

// Input validation schema
const schema = yup.object({
  firstName: yup
    .string()
    .required("Please provide your first name")
    .matches(/^(?!(<script>)).*/, "first name can't contain <script>"),
  lastName: yup
    .string()
    .required("Please provide your last name")
    .matches(/^(?!(<script>)).*/, "last name can't contain <script>"),
  dateOfBirth: yup
    .string()
    .required("Please provide your date of birth")
    .test("under 18", "Please make sure you're above 18!", (value) => {
      if(Math.floor((Date.now() - Date.parse(value)) / (1000 * 60 * 60 * 24 * 365)) < 18){
        return false;
      }
      return true;
    }),
  description: yup
    .string()
    .required("Please provide the description of the appointment"),
});

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
      description: this.props.state.user.Description,
    };
  }

  componentDidMount() {
    fetch("/api/skill", {
      credentials: "include",
    })
      .then(resp => resp.json())
      .then(data => {
        for (var i = 0; i < data.length; i++) {
          this.setState({
            interestOption: [
              ...this.state.interestOption,
              { value: data[i]._id, label: data[i].Name },
            ].filter(
              opt =>
                !this.state.userInterest
                  .map(interest => interest.Skill)
                  .includes(opt.value)
            ),
            skillOption: [
              ...this.state.skillOption,
              { value: data[i]._id, label: data[i].Name },
            ].filter(
              opt =>
                !this.state.userSkill
                  .map(interest => interest.Skill)
                  .includes(opt.value)
            ),
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
        opt => opt.value !== this.state.selectedInterest.id
      );
      let userInterest = [
        {
          Name: this.state.selectedInterest.value,
          Level: this.state.selectedInterest.level,
          Skill: this.state.selectedInterest.id,
        },
        ...this.state.userInterest,
      ];
      this.setState({
        interestOption: option,
        userInterest: userInterest,
        selectedInterest: null,
      });
    }
  }

  // handler when skill add button is clicked (need to remove the option from the select)
  handleAddSkill() {
    if (this.state.selectedSkill !== null) {
      let option = this.state.skillOption.filter(
        opt => opt.value !== this.state.selectedSkill.id
      );
      let userSkill = [
        {
          Name: this.state.selectedSkill.value,
          Level: this.state.selectedSkill.level,
          Skill: this.state.selectedSkill.id,
        },
        ...this.state.userSkill,
      ];
      this.setState({
        skillOption: option,
        userSkill: userSkill,
        selectedSkill: null,
      });
    }
  }

  // handler for changes in slider of the interest
  handleSliderChange(sliderValue, type, id) {
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
        if (interest.Skill === id) {
          interest.Level = level;
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
        if (skill.Skill === id) {
          skill.Level = level;
        }
      }
      this.setState({ userSkill: skillArray });
    }
  }

  // handler when the interest is removed (need to add the option back to the select)
  handleRemove(value, type, id) {
    if (type === "Interest") {
      let userInterest = this.state.userInterest.filter(
        opt => opt.Skill !== id
      );
      let option = [{ value: id, label: value }, ...this.state.interestOption];
      this.setState({
        userInterest: userInterest,
        interestOption: option,
      });
    } else if (type === "Skill") {
      let userSkill = this.state.userSkill.filter(opt => opt.Skill !== id);
      let option = [{ value: id, label: value }, ...this.state.skillOption];
      this.setState({
        userSkill: userSkill,
        skillOption: option,
      });
    }
  }

  handleSubmit(values, actions) {
    // make the submit button disabled
    this.submitButton.setAttribute("disabled", true);
    let newSkills = this.state.userSkill.map(data => {
      return { Skill: data.Skill, Level: data.Level, Name: data.Name };
    });
    let newInterests = this.state.userInterest.map(data => {
      return { Skill: data.Skill, Level: data.Level, Name: data.Name };
    });

    fetch(`/api/user/${this.props.state.user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(this.state.Submission)
      body: JSON.stringify({
        FirstName: values.firstName,
        LastName: values.lastName,
        DOB: values.dateOfBirth,
        Description: values.description,
        Address: this.state.Address,

        Skills: newSkills,
        Interests: newInterests,
      }),
      credentials: "include",
    })
      .then(response => response.json())
      .then(data => {
        let userUpdate = {
          Email: values.email,
          FirstName: values.firstName,
          LastName: values.lastName,
          DOB: values.dateOfBirth,
          Description: values.description,
          Address: this.state.Address,

          Skills: newSkills,
          Interests: newInterests,
        };
        this.props.dispatch({ type: "USER_AUTH", user: userUpdate });
        this.setState({ submitted: true });
      })
      .catch(err => {
        // enable submit button
        this.submitButton.removeAttribute("disabled");
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
          <Avatar name={this.state.name} onClick={() => {}} />
          <p className={styles.edit}>Edit Mode</p>
        </div>
        <Formik
          initialValues={{
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
            description: this.state.description,
          }}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={schema}
          onSubmit={this.handleSubmit}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form noValidate className={styles.form} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicFirstName">
                <Form.Label className={styles.subheader}>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  className={styles.input}
                  type="text"
                  value={values.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicLastName">
                <Form.Label className={styles.subheader}>Last Name</Form.Label>
                <Form.Control
                  name="lastName"
                  className={styles.input}
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicDateOfBirth">
                <Form.Label className={styles.subheader}>
                  Date of Birth
                </Form.Label>
                <Form.Control
                  name="dateOfBirth"
                  className={styles.input}
                  type="date"
                  value={values.dateOfBirth}
                  onChange={handleChange}
                  isInvalid={!!errors.dateOfBirth}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dateOfBirth}
                </Form.Control.Feedback>
              </Form.Group>

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

              <Form.Group controlId="formBasicDateOfBirth">
                <Form.Label className={styles.subheader}>
                  Description
                </Form.Label>
                <p>Write a little bit about yourself.</p>
                <Form.Control
                  name="description"
                  as="textarea"
                  rows="10"
                  className={styles.textarea}
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                ref={submitButton => {
                  this.submitButton = submitButton;
                }}
                className={styles["submit-button"]}
                variant="primary"
                type="submit"
              >
                Confirm
              </Button>
            </Form>
          )}
        </Formik>
      </section>
    );
  }
}

export default connect(mapStateToProps)(ProfileEdit);
