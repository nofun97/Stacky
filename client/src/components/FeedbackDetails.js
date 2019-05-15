import React, { Component } from "react";
import styles from "../styles/components/FeedbackDetails.module.css";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

class FeedbackDetails extends Component {
  render() {
    return (
      <div className={styles.Detail}>
        <h5 className={styles.header}>User</h5>

        <div className={styles.Review}>
          <AddIcon className={styles.icon} />
          <text className={styles.notification}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere porro delectus aspernatur iure debitis placeat accusantium odio. Fugiat unde consequatur, tempore consequuntur sapiente quisquam sed aut, temporibus quas voluptatibus deserunt nam even.</text>
        </div>

        <div className={styles.Review}>
        <RemoveIcon className={styles.icon} />
          <text className={styles.notification}>THIS A NON VALID STATEMENT AND IT IS FULL OF NEGATIVITY</text>
        </div>
      </div>
    );
  }
}

export default FeedbackDetails;
