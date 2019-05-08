import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/pages/Login.module.css";
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
  email: yup
    .string()
    .required("Please provide an email")
    .email("Please provide valid email")
    // For checking whether the email is already in database or not
    .test("Email in database", " ", async (value) => {
      var query = `http://localhost:5000/api/email/${value}`;
      const userData = await fetch(query);
      if(userData.status !== 200){
        return false;
      } else {
        return true;
      }
    }),
  password: yup
    .string()
    .required("Please provide a password")
    .matches(/^(?!(<script>)).*/, "Password can't contain <script>"),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      id: "",
      successful: false,
      user: {},
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(values, actions) {
    // make the submit button disabled
    this.submitButton.setAttribute("disabled", "disabled");

    // Login logic
    // TODO: put url in env?
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: values.email,
          password: values.password,
        },
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // For authentication stuff (if ok then redirect) for now just redirect
        // if (data.ok === true) {
        // }
        // this.props.history.push("/home");
        this.props.dispatch({type: 'USER_AUTH', user: data});
        this.setState({ id: data._id, email: data.Email, successful: true, user: data });
      })
      .catch(err => {
        console.log("Login not succesful");
        console.log(err);
      });
  }

  render() {
    if (this.state.successful === true) {
      return (
        <Redirect
          to={{
            pathname: "/home",
          }}
        />
      );
    }
    return (
      <div className={styles.Login}>
        <section className={styles.Main}>
          <div>
            <h1 className={styles.header}>Welcome back!</h1>
            <h2 className={styles.subheader}>Log in</h2>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={schema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={this.handleLogin}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form noValidate className={styles.form} onSubmit={handleSubmit}>
                <Form.Group className={styles.email} controlId="formBasicEmail">
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
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
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
                <Button
                  ref={submitButton => {
                    this.submitButton = submitButton;
                  }}
                  className={styles["login-button"]}
                  variant="primary"
                  type="submit"
                >
                  Submit
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

export default connect(mapStateToProps)(Login);
