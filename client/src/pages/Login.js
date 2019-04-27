import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/pages/Login.module.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log("Login...");
      console.log(this.state);
      //TODO: put url in env?
      fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: this.state.email,
            password: this.state.password,
          },
        }),
      })
        .then(data => {
          console.log("Login successful!");
          console.log(data);
          // For authentication stuff (if ok then redirect) for now just redirect
          // if (data.ok === true) {
          // }
          this.props.history.push("/home");
        })
        .catch(err => {
          console.log("Login not succesful");
          console.log(err);
        });
    }

    event.preventDefault();
    event.stopPropagation();
  }

  render() {
    return (
      <div className={styles.Login}>
        <section className={styles.Main}>
          <div>
            <h1 className={styles.header}>Welcome back!</h1>
            <h2 className={styles.subheader}>Log in</h2>
          </div>
          {/* change with implementing formik later */}
          <Form noValidate className={styles.form} onSubmit={this.handleLogin}>
            <Form.Group className={styles.email} controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                onChange={e => this.setState({ email: e.target.value })}
                value={this.state.email || ""}
              />
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
                required
                type="password"
                placeholder="Password"
                onChange={e => this.setState({ password: e.target.value })}
                value={this.state.password || ""}
              />
            </Form.Group>
            <Button
              className={styles["btn-secondary"]}
              variant="primary"
              type="submit"
            >
              Submit
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

export default Login;
