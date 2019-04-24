import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from "../styles/pages/Login.module.css";

class Login extends Component {
  render() {
    return (
      <div className={styles.Login}>
        <section className={styles.Main}>
          <div>
            <h1 className={styles.header}>Welcome back!</h1>
            <h2 className={styles.subheader}>Log in</h2>
          </div>
          {/* change with implementing formik later */}
          <Form className={styles.form}>
            <Form.Group className={styles.email} controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className={styles.password} controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button className={styles["btn-secondary"]} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </section>
        <aside className={styles.Illust} />
      </div>
    );
  }
}

export default Login;
