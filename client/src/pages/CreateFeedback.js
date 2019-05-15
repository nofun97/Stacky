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

  handleSubmit = (values, action) => {
    // make the submit button disabled
    this.submitButton.setAttribute("disabled", true);
  };

  render() {
    // /* for later when it's connected to backend need to uncomment to block people from accessing the route */
    if (this.props.location.state === undefined) {
      return <Redirect to="/page_not_found" />;
    }

    return (
      <div className={styles.CreateAppointment}>
        <section className={styles.Main}>
          <h1 className={styles.header}>Feedback for USER</h1>
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
                  <h5 classname={styles.subheader}>As a student...</h5>
                  <div>
                    <Form.Label className={styles.question}>
                      What can they improve on?
                    </Form.Label>
                    <Form.Control
                      name="studentCanImprove"
                      as="textarea"
                      placeholder="Enter Feedback"
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
                      placeholder="Enter Feedback"
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
                  <h5 classname={styles.subheader}>As a teacher...</h5>
                  <div>
                    <Form.Label className={styles.question}>
                      What can they improve on?
                    </Form.Label>
                    <Form.Control
                      name="teacherCanImprove"
                      as="textarea"
                      placeholder="Enter Feedback"
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
                      placeholder="Enter Feedback"
                      onChange={handleChange}
                      value={values.teacherDoWell}
                      isInvalid={!!errors.teacherDoWell}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.teacherDoWell}
                    </Form.Control.Feedback>
                  </div>
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
        <aside className={styles.Illust} />
      </div>
    );
  }
}

export default CreateFeedback;
