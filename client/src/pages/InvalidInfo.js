import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/InvalidInfo.module.css";

class InvalidInfo extends Component {
  render() {
    return (
      <div className={styles.InvalidInfo}>
        <section className={styles.Main}>
          <div>
            <h1 className={styles.header}>Invalid Information</h1>
            <h2 className={styles.subheader}>
              We are unable to process your documents properly. Please re-send
              your files.
            </h2>
          </div>
          {/* change with implementing formik later */}
          <Form className={styles.form}>
            <Form.Group className={styles.doc} controlId="formBasicDocuments">
              <Form.Text className={styles.label}>
                (Driver’s license, Government ID or passport)
              </Form.Text>
              <Form.Text className={styles.sublabel}>
                Accepted format : .png, .jpeg, .jpg, .pdf
              </Form.Text>
              <Form.Control className={styles.input} type="file" placeholder="Insert your Id" />
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

export default InvalidInfo;
