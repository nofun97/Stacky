import React, { Component } from "react";
import Avatar from "react-avatar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as yup from "yup";
import styles from "../styles/pages/CreateAppointment.module.css";

// Input validation schema
const schema = yup.object({
  date: yup
    .string()
    .required("Please provide a date")
    .test("Valid DateTime", "Invalid DateTime", function(value) {
      let dateTime = `${value} ${this.resolve(yup.ref("time"))}`;
      if (Date.now() - Date.parse(dateTime) > 0) {
        return false;
      }
      return true;
    }),
  time: yup
    .string()
    .required("Please provide a time")
    .test("Valid DateTime", "Invalid DateTime", function(value) {
      let dateTime = `${this.resolve(yup.ref("date"))} ${value}`;
      if (Date.now() - Date.parse(dateTime) > 0) {
        return false;
      }
      return true;
    }),
  location: yup
    .string()
    .required("Please provide the location of the appointment"),
  description: yup
    .string()
    .required("Please provide the description of the appointment"),
});

class CreateAppointment extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state);
    this.state = {
      creatorFirstName: this.props.location.state.CreatorFirstName,
      creatorLastName: this.props.location.state.CreatorLastName,
      creatorID: this.props.location.state.CreatorID,
      inviteeFirstName: this.props.location.state.InviteeFirstName,
      inviteeLastName: this.props.location.state.InviteeLastName,
      inviteeID: this.props.location.state.InviteeID,
      date: "",
      time: "",
      location: "",
      description: "",
    };
    this.render = this.render.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // go back to other profile page when cancel is pressed
  handleCancel() {
    this.props.history.goBack();
  }

  // for responsiveness of the avatar
  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({});
    });
  }

  handleSubmit = (values, action) => {
    console.log(values);
    var date = new Date(`${values.date}T${values.time}:00`);
    var body = JSON.stringify({
      Time: date,
      Description: values.description,
      Address: values.location,
      Invitee: this.state.inviteeID,
      InviteeFirstName: this.state.inviteeFirstName,
      InviteeLastName: this.state.inviteeLastName,
      Creator: this.state.creatorID,
      CreatorFirstName: this.state.creatorFirstName,
      CreatorLastName: this.state.creatorLastName,
    });
    console.log(body);
    fetch(`http://localhost:5000/api/appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: body,
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        this.props.history.goBack();
      });
  };

  render() {
    let name = `${this.state.inviteeFirstName} ${this.state.inviteeLastName}`;

    /* for later when it's connected to backend need to uncomment to block people from accessing the route */
    // if(this.props.location.state === undefined){
    //   return <Redirect to="/page_not_found" />
    // }

    let avatar;
    if (window.innerWidth <= 426) {
      avatar = (
        <div>
          <Avatar
            size="60px"
            className={styles.avatar}
            name={name}
            round={true}
          />
        </div>
      );
    } else {
      avatar = <Avatar className={styles.avatar} name={name} round={true} />;
    }

    return (
      <div className={styles.CreateAppointment}>
        <section className={styles.Main}>
          <h1 className={styles.header}>Set up Meeting</h1>
          <h2 className={styles.subheader}>Invitee</h2>
          {avatar}
          <Formik
            initialValues={{
              date: "",
              time: "",
              location: "",
              description: "",
            }}
            validationSchema={schema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={this.handleSubmit}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form noValidate className={styles.form} onSubmit={handleSubmit}>
                <Form.Group className={styles.datetime} controlId="dateTime">
                  <div>
                    <Form.Label className={styles.date}>Date</Form.Label>
                    <Form.Control
                      name="date"
                      type="date"
                      placeholder="Enter Date"
                      onChange={handleChange}
                      value={values.date}
                      isInvalid={!!errors.date}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.date}
                    </Form.Control.Feedback>
                  </div>
                  <div>
                    <Form.Label className={styles.time}>Time</Form.Label>
                    <Form.Control
                      name="time"
                      type="time"
                      placeholder="Enter Time"
                      onChange={handleChange}
                      value={values.time}
                      isInvalid={!!errors.time}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.time}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>

                <Form.Group className={styles.location} controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    name="location"
                    as="textarea"
                    onChange={handleChange}
                    value={values.location}
                    isInvalid={!!errors.location}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.location}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className={styles.description}
                  controlId="description"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    as="textarea"
                    onChange={handleChange}
                    value={values.description}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  className={styles["cancel-button"]}
                  variant="primary"
                  onClick={this.handleCancel}
                >
                  Cancel
                </Button>

                <Button
                  ref="submit-btn"
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
        <aside className={styles.Illust} />
      </div>
    );
  }
}

export default CreateAppointment;
