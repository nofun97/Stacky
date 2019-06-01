import React, { Component } from "react";
import Avatar from "react-avatar";
import styles from "../styles/components/FeedbackNotification.module.css";

class FeedbackNotification extends Component {
  render() {
    let avatar;
    if (window.innerWidth <= 426) {
      avatar = (
        <div>
          <Avatar size="40px" name={this.props.name} className={styles.avatar} round={true} />
        </div>
      );
    } else {
      avatar = <Avatar size="55px" name={this.props.name} className={styles.avatar} round={true} />;
    }
    return (
      <div className={styles.indicator}>
        {avatar}
        <h5 className={styles.notification}>{this.props.name} left you feedback</h5>
      </div>
    );
  }
}

export default FeedbackNotification;
