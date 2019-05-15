import React, { Component } from "react";
import styles from "../styles/components/FeedbackDetails.module.css";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

class FeedbackDetails extends Component {
  render() {
    return (
      <div className={styles.Detail}>
        <h5 className={styles.header}>{this.props.name}</h5>

        <div className={styles.Review}>
          <AddIcon className={styles.icon} />
          <text className={styles.notification}>{this.props.pros}</text>
        </div>

        <div className={styles.Review}>
          <RemoveIcon className={styles.icon} />
          <text className={styles.notification}>{this.props.cons}</text>
        </div>
      </div>
    );
  }
}

export default FeedbackDetails;
