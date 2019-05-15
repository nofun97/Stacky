import React, { Component } from "react";
import Button from "react-bootstrap/Button";

import styles from "../styles/pages/FeedbackSuccess.module.css";

class FeedbackSuccess extends Component {
  constructor(props){
    super(props);
    this.goHome = this.goHome.bind(this);
    this.goUserProfile = this.goUserProfile.bind(this);
  }

  goHome() {
    this.props.history.push('/home');
  }

  goUserProfile() {
    this.props.history.go(-2);
  }

  render() {
    let user = `${this.props.location.state.firstName} ${this.props.location.state.lastName}`;
    return (
      <div className={styles.FeedbackSuccess}>
        <section className={styles.Main}>
          <div>
            <h1 className={styles.header}>Feedback Successful!</h1>
            <h2 className={styles.subheader}>
            Thank you for your feedback to {user}. We appreciate you taking the steps to contribute towards the growth of others. 
            </h2>
          </div>
          <div> 
          <Button className={styles["button"]} variant="primary" onClick={this.goHome}>
            Back to My Home
          </Button>
          </div>

          <div>
          <Button className={styles["buttonProfile"]} variant="primary" onClick={this.goUserProfile}>
            Back to User's Profile
          </Button>
          </div>
        </section>
        <aside className={styles.Illust}>
          <aside className={styles.image} />
        </aside>
      </div>
    );
  }
}

export default FeedbackSuccess;