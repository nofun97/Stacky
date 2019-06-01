import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import { Redirect } from "react-router-dom";
import * as yup from "yup";
import styles from "../styles/pages/CreateFeedback.module.css";

// Input validation schema
const schema = yup.object({
  studentCanImprove: yup.string().required("Please fill in the form"),

  studentDoWell: yup.string().required("Please fill in the form"),

  teacherCanImprove: yup.string().required("Please fill in the form"),

  teacherDoWell: yup.string().required("Please fill in the form"),
});

class CreateFeedback extends Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (values, action) => {
    /*
      values: {
              studentCanImprove: "",
              studentDoWell: "",
              teacherCanImprove: "",
              teacherDoWell: "",
            }
    */
    const header = {
      // TargetRole: req.body.TargetRole
      CreatedBy: this.props.location.state.CreatorID,
      CreatedFor: this.props.location.state.InviteeID,
      ReviewerFirstName: this.props.location.state.CreatorFirstName,
      ReviewerLastName: this.props.location.state.CreatorLastName,
      RevieweeFirstName: this.props.location.state.InviteeFirstName,
      RevieweeLastName: this.props.location.state.InviteeLastName,
    };

    const option = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const asStudent = {
      ...option,
      body: JSON.stringify({
        ...header,
        Pros: values.studentDoWell,
        Cons: values.studentCanImprove,
        Type: "Student",
      }),
    };

    const asTeacher = {
      ...option,
      body: JSON.stringify({
        ...header,
        Pros: values.teacherDoWell,
        Cons: values.teacherCanImprove,
        Type: "Teacher",
      }),
    };

    var asTeacherStatus = await fetch("/api/review", asTeacher);
    var asStudentStatus = await fetch("/api/review", asStudent);

    var asTeacherResp = await asTeacherStatus.json();
    var asStudentResp = await asStudentStatus.json();

    if (
      asTeacherResp.error === undefined &&
      asStudentResp.error === undefined
    ) {
      // make the submit button disabled
      this.submitButton.setAttribute("disabled", true);
      this.props.history.push({
        pathname: "/feedback_success",
        state: {
          userID: this.props.location.state.CreatorID,
          userFirstName: this.props.location.state.CreatorFirstName,
          userLastName: this.props.location.state.CreatorLastName,
        },
      });
    }
  };

  render() {
    /* for later when it's connected to backend need to uncomment to block people from accessing the route */
    if (this.props.location.state === undefined) {
      return <Redirect to="/page_not_found" />;
    }

    let name = `${this.props.location.state.InviteeFirstName} ${this.props.location.state.InviteeLastName}`;

    return (
      <div className={styles.CreateAppointment}>
        <section className={styles.Main}>
          <h1 className={styles.header}>Feedback for {name}</h1>
          <Formik
            initialValues={{
              studentCanImprove: "",
              studentDoWell: "",
              teacherCanImprove: "",
              teacherDoWell: "",
            }}
            validationSchema={schema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={this.handleSubmit}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form noValidate className={styles.form} onSubmit={handleSubmit}>
                <Form.Group
                  className={styles.studentFeedback}
                  controlId="studentFeedback"
                >
                  <h5 className={styles.subheader}>As a student...</h5>
                  <div>
                    <Form.Label className={styles.question}>
                      What can they improve on?
                    </Form.Label>
                    <Form.Control
                      name="studentCanImprove"
                      as="textarea"
                      maxLength="250"
                      placeholder="Enter Feedback (max: 250 char)"
                      onChange={handleChange}
                      value={values.studentCanImprove}
                      isInvalid={!!errors.studentCanImprove}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.studentCanImprove}
                    </Form.Control.Feedback>
                  </div>

                  <div>
                    <Form.Label className={styles.nextquestion}>
                      What did they do well?
                    </Form.Label>
                    <Form.Control
                      name="studentDoWell"
                      as="textarea"
                      maxLength="250"
                      placeholder="Enter Feedback (max: 250 char)"
                      onChange={handleChange}
                      value={values.studentDoWell}
                      isInvalid={!!errors.studentDoWell}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.studentDoWell}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>

                <Form.Group
                  className={styles.teacherFeedback}
                  controlId="teacherFeedback"
                >
                  <h5 className={styles.subheader}>As a teacher...</h5>
                  <div>
                    <Form.Label className={styles.question}>
                      What can they improve on?
                    </Form.Label>
                    <Form.Control
                      name="teacherCanImprove"
                      as="textarea"
                      maxLength="250"
                      placeholder="Enter Feedback (max: 250 char)"
                      onChange={handleChange}
                      value={values.teacherCanImprove}
                      isInvalid={!!errors.teacherCanImprove}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.teacherCanImprove}
                    </Form.Control.Feedback>
                  </div>

                  <div>
                    <Form.Label className={styles.nextquestion}>
                      What did they do well?
                    </Form.Label>
                    <Form.Control
                      name="teacherDoWell"
                      as="textarea"
                      maxLength="250"
                      placeholder="Enter Feedback (max: 250 char)"
                      onChange={handleChange}
                      value={values.teacherDoWell}
                      isInvalid={!!errors.teacherDoWell}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.teacherDoWell}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>

                <div className={styles.button}>
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
                </div>
              </Form>
            )}
          </Formik>
        </section>
        <aside className={styles.Illust} />
      </div>
    );
  }
}

export default CreateFeedback;
