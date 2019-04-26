import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/pages/Signup.module.css";
import { Redirect } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      FirstName: "",
      LastName: "",
      DOB: "",
      UName: "",
      IsVerified: false,
      Address: "",
      confirmPassword: "",
      ID: "",
      InvalidInfo: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render = this.render.bind(this);
  }

  handleSubmit(event) {
    console.log("Submitting...");
    console.log(this.state);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    //TODO: put url in env?
    fetch("http://localhost:5000/api/user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(this.state.Submission)
        body: JSON.stringify({
          user: {
            email: this.state.email,
            password: this.state.password
          },
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
          DOB: this.state.DOB,
          UName: this.state.UName,
          IsVerified: this.state.IsVerified,
          Address: this.state.Address
        })
      })
      .then(data => {
        this.setState({ ID: data._id });
        console.log("Submission successful!");
        console.log(data);
      })
      .catch(err => {
        console.log("Submission not succesful");
        console.log(err);
        this.setState({
          InvalidInfo: true
        });
      })
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
          <Form noValidate className={styles.form} onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group role="form" className={styles.email} controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" placeholder="Enter email"
                onChange={e => this.setState({ email: e.target.value })}
                value={this.state.email || ''}
              />
            </Form.Group>

            <Form.Group className={styles.name} controlId="formBasicName">
              <div>
                <Form.Label>First Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter First Name"
                  onChange={e => this.setState({ FirstName: e.target.value })}
                  value={this.state.FirstName || ''}
                />
              </div>
              <div>
                <Form.Label>Surname</Form.Label>
                <Form.Control required type="text" placeholder="Enter Surname"
                  onChange={e => this.setState({ LastName: e.target.value })}
                  value={this.state.LastName || ''}
                />
              </div>
            </Form.Group>

            <Form.Group className={styles.dob} controlId="formBasicDOB">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control required className={styles.dateInput} type="date" placeholder="Enter Date of birth"
                onChange={e => this.setState({ DOB: e.target.value })}
                value={this.state.DOB}
              />
            </Form.Group>

            <Form.Group
              className={styles.password}
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Password"
                onChange={e => this.setState({ password: e.target.value })}
                value={this.state.password || ''}
              />
            </Form.Group>

            <Form.Group
              className={styles.confirmPassword}
              controlId="formBasicConfirmPassword"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control required type="password" placeholder="Password"
                onChange={e => this.setState({ confirmPassword: e.target.value })}
                value={this.state.confirmPassword || ''}
                isInvalid={!(this.state.confirmPassword === this.state.password)}
              />
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
        <aside className={styles.Illust} />
      </div>
    );
  }
}

export default Signup;
