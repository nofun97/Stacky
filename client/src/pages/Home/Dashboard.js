import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import styles from "../../styles/pages/Home/Dashboard.module.css";
import FeedbackNotificationList from "../../components/FeedbackNotificationList";
import FeedbackDetails from "../../components/FeedbackDetails";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewAppointment: false,
      // mock for feedback list (remove when already using fetch to fetch the user)
      feedbackUsers: [
        { firstName: "Raol", lastName: "Slioco" },
        { firstName: "Kaye", lastName: "Yoss" },
      ],
    };
    this.handleAppointments = this.handleAppointments.bind(this);
  }

  // for responsiveness of the avatar
  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({});
    });
  }

  handleAppointments() {
    this.setState({
      viewAppointment: true,
    });
  }

  render() {
    if (this.state.viewAppointment === true) {
      return <Redirect to="/home/appointments" />;
    }

    return (
      <section className={styles.container}>
        <div className={styles.appointment}>
          <h1 className={styles.headings}>Appointments</h1>
          <div className={styles.subappointment}>
            <Button
              className={styles["button"]}
              onClick={this.handleAppointments}
            >
              View All
            </Button>
            <div className={styles.symbol}>>></div>
          </div>
        </div>

        <div className={styles.feedback}>
          <h1 className={styles.feedbackHeading}>Feedback</h1>
          <Button className={styles["button"]} onClick={this.handleFeedback}>
            View All
          </Button>
          <FeedbackNotificationList values={this.state.feedbackUsers} />
          <FeedbackDetails />
        </div>
      </section>
    );
  }
}

export default Dashboard;
