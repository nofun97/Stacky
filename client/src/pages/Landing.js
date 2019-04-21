import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "../styles/Landing.module.css";

class Landing extends Component {
  render() {
    return (
      <div className={styles.Landing}>
        <section className={styles.Description}>
          <h1 className={styles.h1}>Welcome to Skill Tree</h1>
          <h2 className={styles.h2}>Teach while you learn - 100% free</h2>
          <p className={styles.p}>
            Skill Tree is a platform that connects skill seekers with each
            other.
          </p>
          <p className={styles.p}>
            You will find and connect with a fellow user who is skilled in your
            area of interest. While they will be interested in a skill you have.
          </p>
          <p className={styles.p}>
            Instead of any financial transaction, you will teach them a skill
            you know in return!
          </p>
          <p className={styles.p}>
            We aim to facilitate meaningful interactions in local communities
            through encouraging learning together and helping each other grow.
          </p>
        </section>
        <aside className={styles.Rightbar}>
          <Link className={styles["Signup-button"]} to="/signup">
            <Button className={styles["btn-primary"]} variant="primary" block>Sign up</Button>
          </Link>
          <Link className={styles["Login-button"]} to="/login">
            <Button className={styles["btn-secondary"]} variant="secondary" block>Log in</Button>
          </Link>
        </aside>
      </div>
    );
  }
}

export default Landing;
