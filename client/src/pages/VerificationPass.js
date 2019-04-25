import React, { Component } from "react";
import Button from "react-bootstrap/Button";

import styles from "../styles/pages/VerificationPass.module.css";

class VerificationPass extends Component {
  render() {
    return (
      <div className={styles.VerificationPass}>
        <section className={styles.Main}>
            <h1 className={styles.header}>
              Verification <br />
              Successful!
            </h1>

            <h2 className={styles.subheader}>
              You now have full access to our services.
            </h2>
          <Button className={styles["button"]} variant="primary" type="submit">
            Skills and Interests
          </Button>
        </section>
        <aside className={styles.Illust} />
        <aside className={styles.image} />
      </div>
    );
  }
}

export default VerificationPass;
