import React, { Component } from "react";
import styles from "../styles/pages/ListSkill.module.css";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import InterestEditorList from "../components/InterestEditorList";

class ListSkill extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
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
      selectedInterest: [{ value: "a", level: "Beginner", id: "a" }],
      selectedSkill: [{ value: "Algorithm", level: "Intermediate", id: "sdsdsd" }],
    };
  }

  // handler when add button is clicked (need to remove the option from the select)
  handleAdd() {}

  // handler when submit button is clicked
  handleSubmit() {}

  // handler for changes in slider of the interest or skill
  handleSliderChange() {}

  // handler when the interest is removed (need to add the option back to the select)
  handleRemove() {}

  render() {
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
              name="interest"
              options={this.state.interestOption}
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
          <section className={styles.listing}>
            <h2 className={styles.section}>What would you like to learn?</h2>
            <Select
              className={styles.select}
              classNamePrefix="select"
              isClearable={true}
              isSearchable={true}
              name="interest"
              options={this.state.skillOption}
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
          <Button className={styles.submit} type="submit">
            Confirm
          </Button>
        </section>
        <aside className={styles.Illust} />
      </div>
    );
  }
}

export default ListSkill;
