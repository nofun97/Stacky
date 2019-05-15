import React, { Component } from "react";
import Button from "react-bootstrap/Button";

import styles from "../styles/pages/FeedbackSuccess.module.css";

class FeedbackSuccess extends Component {
  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className={styles.FeedbackSuccess}>
        <section className={styles.Main}>
          <div>
            <h1 className={styles.header}>Feedback Successful!</h1>
            <h2 className={styles.subheader}>
            Thank you for your feedback to USER. We appreciate you taking the steps to contribute towards the growth of others. 
            </h2>
          </div>
          <div> 
          <Button className={styles["button"]} variant="primary" onClick={this.goBack}>
            Back to My Home
          </Button>
          </div>

          <div>
          <Button className={styles["buttonProfile"]} variant="primary" onClick={this.goBack}>
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