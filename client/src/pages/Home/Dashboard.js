import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import styles from "../../styles/pages/Home/Dashboard.module.css";
import FeedbackNotificationList from "../../components/FeedbackNotificationList";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewAppointment: false,
      viewFeedback: false,
      feedbackUsers: [],
      size: 2
    };
    this.handleAppointments = this.handleAppointments.bind(this);
    this.handleFeedback = this.handleFeedback.bind(this);
    this.updateWindow = this.updateWindow.bind(this);
    this.handleRecentFeedback = this.handleRecentFeedback.bind(this);
  }

  updateWindow() {
    this.setState({});
  }

  // for responsiveness of the avatar
  componentDidMount = async () => {
    window.addEventListener("resize", this.updateWindow);
    await this.handleRecentFeedback();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindow);
  }

  handleRecentFeedback = async () => {
    const URL = '/api/review';
    const query = `?id=${this.props.id}&from=0&size=${this.state.size}`
    const option = {
      credentials: "include",
      method: "GET"
    }

    const status = await fetch(URL + query, option);
    const response = await status.json();
    if (response.error !== undefined){
      console.log(response.error);
      return;
    }
    console.log(response);
    var student = response.asReviewee.map(e => {
      return {
        firstName: e.ReviewerFirstName,
        lastName: e.ReviewerLastName,
        _id: e._id
      }
    })

    this.setState({
      ...this.state,
      feedbackUsers: student,
    })
  }

  handleAppointments() {
    this.setState({
      viewAppointment: true,
    });
  }

  handleFeedback() {
    this.setState({
      viewFeedback: true,
    })
  }

  render() {
    if (this.state.viewAppointment === true) {
      return <Redirect to="/home/appointments" />;
    } else if (this.state.viewFeedback === true) {
      return <Redirect to="/home/feedbacks"/>;
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
        </div>
      </section>
    );
  }
}

export default Dashboard;
