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

    // to filter selected skill from the option
    let skillOption = [
      { value: "algorithm", label: "algorithm" },
      { value: "baking", label: "baking" },
      { value: "caligraphy", label: "caligraphy" },
    ].filter(opt => !this.props.filterSkill.map(skill => skill.value).includes(opt.value));

    this.state = {
      selectedSkill: null,
      skillOption: skillOption,
      filterSkill: this.props.filterSkill,
    };
  }

  // handler when skill add button is clicked (need to remove the option from the select)
  handleAddSkill() {
    if (this.state.selectedSkill !== null) {
      let option = this.state.skillOption.filter(
        opt => opt.value !== this.state.selectedSkill.value
      );
      let filterSkill = [this.state.selectedSkill, ...this.state.filterSkill];
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
          value: value.value,
          level: "Intermediate",
          id: value.value,
          label: value.value,
        },
      });
    } else {
      this.setState({
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
      let interestArray = this.state.filterInterest;
      for (let interest of interestArray) {
        if (interest.value === keyValue) {
          interest.level = level;
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
        if (skill.value === keyValue) {
          skill.level = level;
        }
      }
      this.setState({ filterSkill: skillArray });
    }
  }

  // handler when the interest is removed (need to add the option back to the select)
  handleRemove(value, type) {
    console.log(value, type);
    if (type === "Interest") {
      let filterInterest = this.state.filterInterest.filter(
        opt => opt.value !== value
      );
      let option = [
        { value: value, label: value },
        ...this.state.interestOption,
      ];
      this.setState({
        filterInterest: filterInterest,
        interestOption: option,
      });
    } else if (type === "Skill") {
      let filterSkill = this.state.filterSkill.filter(opt => opt.value !== value);
      let option = [{ value: value, label: value }, ...this.state.skillOption];
      this.setState({
        filterSkill: filterSkill,
        skillOption: option,
      });
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
