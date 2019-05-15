import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import styles from "../../styles/pages/Home/AllFeedback.module.css";
import FeedbackDetailsList from "../../components/FeedbackDetailsList";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      learnerFeedback: [
        {
          firstName: "Raol",
          lastName: "Slioco",
          pros:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere porro delectus aspernatur iure debitis placeat accusantium odio. Fugiat unde consequatur, tempore consequuntur sapiente quisquam sed aut, temporibus quas voluptatibus deserunt nam even.",
          cons: "THIS A NON VALID STATEMENT AND IT IS FULL OF NEGATIVITY",
        },
      ],
      teacherFeedback: [
        {
          firstName: "Raol",
          lastName: "Slioco",
          pros:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere porro delectus aspernatur iure debitis placeat accusantium odio. Fugiat unde consequatur, tempore consequuntur sapiente quisquam sed aut, temporibus quas voluptatibus deserunt nam even.",
          cons: "THIS A NON VALID STATEMENT AND IT IS FULL OF NEGATIVITY",
        },
      ],
    };
  }

  render() {
    return (
      <section className={styles.container}>
        <div className={styles.feedback}>
          <h1 className={styles.headings}>Learner Feedback</h1>
          <FeedbackDetailsList values={this.state.learnerFeedback} />
        </div>

        <div className={styles.feedback}>
          <h1 className={styles.headings}>Teacher Feedback</h1>
          <FeedbackDetailsList values={this.state.teacherFeedback} />
        </div>

        <Button>Confirm</Button>
      </section>
    );
  }
}

export default Dashboard;
