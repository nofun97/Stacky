import React, { Component } from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import InterestEditorList from "./InterestEditorList";
import styles from "../styles/components/FilterDrawer.module.css";

class FilterDrawer extends Component {
  constructor(props) {
    super(props);
    this.handleAddSkill = this.handleAddSkill.bind(this);
    this.handleSkillSelect = this.handleSkillSelect.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

    this.state = {
      selectedSkill: null,
      skillOption: [],
      filterSkill: this.props.filterSkill,
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
            skillOption: [
              ...this.state.skillOption,
              { value: data[i]._id, label: data[i].Name },
            ],
          });
        }
      });
  }

  // handler when skill add button is clicked (need to remove the option from the select)
  handleAddSkill() {
    if (this.state.selectedSkill !== null) {
      let option = this.state.skillOption.filter(
        opt => opt.value !== this.state.selectedSkill.id
      );
      let filterSkill = [
        {
          Name: this.state.selectedSkill.value,
          Level: this.state.selectedSkill.level,
          Skill: this.state.selectedSkill.id,
        },
        ...this.state.filterSkill,
      ];
      this.setState({
        skillOption: option,
        filterSkill: filterSkill,
        selectedSkill: null,
      });
      this.props.onSkillFilter(filterSkill);
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
      let interestArray = this.state.filterInterest;
      for (let interest of interestArray) {
        if (interest.Skill === id) {
          interest.Level = level;
        }
      }
      this.setState({ filterInterest: interestArray });
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
      let skillArray = this.state.filterSkill;
      for (let skill of skillArray) {
        if (skill.Skill === id) {
          skill.Level = level;
        }
      }
      this.setState({ filterSkill: skillArray });
    }
  }

  // handler when the interest is removed (need to add the option back to the select)
  handleRemove(value, type, id){
    if (type === "Interest") {
      let filterInterest = this.state.filterInterest.filter(
        opt => opt.Skill !== id
      );
      let option = [
        { value: id, label: value },
        ...this.state.interestOption,
      ];
      this.setState({
        filterInterest: filterInterest,
        interestOption: option,
      });
      this.props.onInterestFilter(filterInterest);
    } else if (type === "Skill") {
      let filterSkill = this.state.filterSkill.filter(
        opt => opt.Skill !== id
      );
      let option = [{ value: id, label: value }, ...this.state.skillOption];
      this.setState({
        filterSkill: filterSkill,
        skillOption: option,
      });
      this.props.onSkillFilter(filterSkill);
    }
  }

  render() {
    return (
      <div className={styles.drawer}>
        <section className={styles.listing}>
          <h1>Select skill to filter:</h1>
          <Select
            className={styles.select}
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            value={this.state.selectedSkill}
            name="interest"
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
            values={this.state.filterSkill}
          />
        </section>
      </div>
    );
  }
}

export default FilterDrawer;
