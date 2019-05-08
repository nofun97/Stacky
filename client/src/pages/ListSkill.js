import React, { Component } from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import InterestEditorList from "../components/InterestEditorList";
import styles from "../styles/pages/ListSkill.module.css";

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

class ListSkill extends Component {
  constructor(props) {
    super(props);
    this.handleAddSkill = this.handleAddSkill.bind(this);
    this.handleAddInterest = this.handleAddInterest.bind(this);
    this.handleSkillSelect = this.handleSkillSelect.bind(this);
    this.handleInterestSelect = this.handleInterestSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      selectedInterest: null,
      selectedSkill: null,
      interestOption: [],
      skillOption: [],
      userInterest: [],
      userSkill: [],
      submitted: false,
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/skill")
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
        this.state.selectedInterest,
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

  // handler when submit button is clicked
  handleSubmit() {

    let interests = this.state.userInterest.map(data => {
      return {
        Skill: data.id,
        Level: data.level
      };
    });
    let skills = this.state.userSkill.map(data => {
      return {
        Skill: data.id,
        Level: data.level
      };
    });
    //TODO: test update profile
    fetch(`http://localhost:5000/api/user/${this.props.state.user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Skills: skills,
          Interests: interests,
        })
    })
      .then(response => response.json())
      .then(data => {
        this.props.dispatch({type: "USER_ADD_SKILL", skills});
        this.props.dispatch({type: "USER_ADD_INTEREST", interests});
        this.setState({
          submitted: true,
        });
      });
  }

  render() {
    if (this.state.submitted) {
      return (
        <Redirect
          to={{
            pathname: "/home",
          }}
        />
      );
    }

    return (
      <div className={styles.Login}>
        <section className={styles.Main}>
          <div>
            <h1 className={styles.header}>Skills and Interests</h1>
            <h2 className={styles.subheader}>
              Now that your profile is ready, enter your skills, interests and
              confidence in them to start finding fellow learners.
            </h2>
            <h3 className={styles.direction}>
              *Please select the lowest level if you are unsure.
            </h3>
          </div>
          <section className={styles.listing}>
            <h2 className={styles.section}>What would you like to learn?</h2>
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
          <section className={styles.listing}>
            <h2 className={styles.section}>What would you like to teach?</h2>
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
          <Button
            className={styles.submit}
            type="submit"
            onClick={this.handleSubmit}
          >
            Confirm
          </Button>
        </section>
        <aside className={styles.Illust} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ListSkill);
