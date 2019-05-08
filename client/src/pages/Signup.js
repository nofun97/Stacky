import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/pages/Signup.module.css";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    state: state
  }
}


// Input validation schema
const schema = yup.object({
  firstName: yup
    .string()
    .required("Please provide your first name")
    .matches(/^(?!(<script>)).*/, "first name can't contain <script>"),
  lastName: yup
    .string()
    .required("Please provide your last name")
    .matches(/^(?!(<script>)).*/, "last name can't contain <script>"),
  dateOfBirth: yup.string().required("Please provide your date of birth"),
  file: yup.string(),
  email: yup
    .string()
    .required("Please provide an email")
    .email("Please provide valid email")
    // for checking whether email has already been regustered
    .test("Email in database", " ", async (value) => {
      var query = `http://localhost:5000/api/email/${value}`;
      const userData = await fetch(query);
      if(userData.status === 200){
        return false;
      } else {
        return true;
      }
    }),
  password: yup
    .string()
    .required("Please provide a password")
    .matches(/^(?!(<script>)).*/, "Password can't contain <script>"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .matches(/^(?!(<script>)).*/, "Confirm Password can't contain <script>"),
});

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
      user: {},
      InvalidInfo: false,
      successful: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render = this.render.bind(this);
  }

  handleSubmit(values, actions) {
    // Prevent on double submit on form
    this.submitButton.setAttribute("disabled", "disabled");

    // Checking the age if it's lower than 18 redirect
    if(Math.floor((Date.now() - Date.parse(values.dateOfBirth)) / (1000*60*60*24)) < 18){
      this.props.history.push("/verification/fail");
      return;
    }

    //TODO: put url in env?
    fetch("http://localhost:5000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(this.state.Submission)
      body: JSON.stringify({
        user: {
          email: values.email,
          password: values.password,
        },
        FirstName: values.firstName,
        LastName: values.lastName,
        DOB: values.dateOfBirth,

        //TODO: implement this on the sign up form
        UName: this.state.UName,
        IsVerified: this.state.IsVerified,
        Address: this.state.Address,
      }),
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ ID: data._id, email: data.Email, successful: true, user: data });
        this.props.dispatch({type: 'USER_AUTH', user: data});
      })
      .catch(err => {
        console.log("Submission not succesful");
        console.log(err);
        this.setState({
          InvalidInfo: true,
        });
      });
  }

  render() {
    if (this.state.successful === true) {
      return (
        <Redirect
          to={{
            pathname: "/verification/pass",
          }}
        />
      );
    }
    return (
      <div className={styles.Signup}>
        <section className={styles.Main}>
          <div>
            <h1 className={styles.header}>Sign up</h1>
          </div>
          <Formik
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              dateOfBirth: "",
              password: "",
              confirmPassword: "",
              file: "",
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={schema}
            onSubmit={this.handleSubmit}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form noValidate className={styles.form} onSubmit={handleSubmit}>
                <Form.Group
                  role="form"
                  className={styles.email}
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    value={values.email}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className={styles.name} controlId="formBasicName">
                  <div>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="firstName"
                      type="text"
                      placeholder="Enter First Name"
                      onChange={handleChange}
                      value={values.firstName}
                      isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </div>
                  <div>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                      name="lastName"
                      type="text"
                      placeholder="Enter Surname"
                      onChange={handleChange}
                      value={values.lastName}
                      isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>

                <Form.Group className={styles.dob} controlId="formBasicDOB">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    name="dateOfBirth"
                    className={styles.dateInput}
                    type="date"
                    placeholder="Enter Date of birth"
                    onChange={handleChange}
                    value={values.dateOfBirth}
                    isInvalid={!!errors.dateOfBirth}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dateOfBirth}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className={styles.password}
                  controlId="formBasicPassword"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={values.password}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className={styles.confirmPassword}
                  controlId="formBasicConfirmPassword"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    name="confirmPassword"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={values.confirmPassword}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className={styles.doc}
                  controlId="formBasicDocuments"
                >
                  <Form.Label className={styles.label}>Documents</Form.Label>
                  <Form.Text className="text-muted">
                    We need this to verify your identity (Driver’s license,
                    Government ID or passport)
                  </Form.Text>
                  <Form.Text className="text-muted">
                    Accepted format : .png, .jpeg, .jpg, .pdf
                  </Form.Text>
                  <Form.Control
                    name="file"
                    className={styles.fileButton}
                    type="file"
                    placeholder="Insert your Id"
                    value={values.file}
                    onChange={handleChange}
                    isInvalid={!!errors.file}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  ref={submitButton => {
                    this.submitButton = submitButton;
                  }}
                  className={styles["confirm-button"]}
                  variant="primary"
                  type="submit"
                >
                  Confirm
                </Button>
              </Form>
            )}
          </Formik>
        </section>
        <aside className={styles.Illust}>
          <aside className={styles.image} />
        </aside>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Signup);
