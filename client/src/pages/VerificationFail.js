import React, { Component } from "react";

import styles from "../styles/pages/VerificationFail.module.css";

class VerificationFail extends Component {
  render() {
    return (
      <div className={styles.VerificationFail}>
        <section className={styles.Main}>
          <h1 className = {styles.header}>We're Sorry</h1>
          <p className={styles.paragraph}>
            Unfortunately, you are not eligible to join the service at this
            time.
            <br /> These may be one of the reasons:
          </p>
          <ul className={styles.Information}>
            <li>You are not yet 18 years old.</li>
            <li>You did not pass the background check</li>
          </ul>
          <p className={styles.paragraph}>
            We encourage you to try again <br />
            when you have fulfilled either or both criteria.
          </p>
        </section>
        <aside className={styles.Illust} />
      </div>
    );
  }
}

export default VerificationFail;
