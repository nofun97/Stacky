import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/pages/Signup.module.css";
import { Redirect } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      InvalidInfo: false,
    };
  }

  handleSubmit() {
    this.setState({
      InvalidInfo: true,
    });
  }

  render() {
    if (this.state.InvalidInfo === true) {
      return <Redirect to="/invalid_info" />;
    }

    return (
      <div className={styles.Signup}>
        <section className={styles.Main}>
          <div>
            <h1 className={styles.header}>Sign up</h1>
          </div>
          {/* change with implementing formik later */}
          <Form className={styles.form} onSubmit={this.handleSubmit}>
            <Form.Group className={styles.email} controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className={styles.name} controlId="formBasicName">
              <div>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" />
              </div>
              <div>
                <Form.Label>Surname</Form.Label>
                <Form.Control type="text" placeholder="Enter Surname" />
              </div>
            </Form.Group>

            <Form.Group className={styles.dob} controlId="formBasicDOB">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control className={styles.dateInput} type="date" placeholder="Enter Date of birth" />
            </Form.Group>

            <Form.Group
              className={styles.password}
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group
              className={styles.confirmPassword}
              controlId="formBasicConfirmPassword"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className={styles.doc} controlId="formBasicDocuments">
              <Form.Label className={styles.label}>Documents</Form.Label>
              <Form.Text className="text-muted">
                We need this to verify your identity (Driver’s license,
                Government ID or passport)
              </Form.Text>
              <Form.Text className="text-muted">
                Accepted format : .png, .jpeg, .jpg, .pdf
              </Form.Text>
              <Form.Control className={styles.fileButton} type="file" placeholder="Insert your Id" />
            </Form.Group>

            <Button
              className={styles["btn-secondary"]}
              variant="primary"
              type="submit"
            >
              Confirm
            </Button>
          </Form>
        </section>
        <aside className={styles.Illust}>
          <aside className={styles.image} />
        </aside>
      </div>
    );
  }
}

export default Signup;
