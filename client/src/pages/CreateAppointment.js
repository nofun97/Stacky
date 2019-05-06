import React, { Component } from "react";
import Avatar from "react-avatar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/pages/CreateAppointment.module.css";

class CreateAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "Frisco",
      lastName: "Saol",
      date: "",
      time: "",
      location: "",
      description: "",
    };
    this.render = this.render.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  // go back to other profile page when cancel is pressed
  handleCancel(){
    this.props.history.goBack();
  }

  // for responsiveness of the avatar
  componentDidMount(){
    window.addEventListener("resize", () => {this.setState({})});
  }

  render() {
    let name = `${this.state.firstName} ${this.state.lastName}`;

    /* for later when it's connected to backend need to uncomment to block people from accessing the route */
    // if(this.props.location.state === undefined){
    //   return <Redirect to="/page_not_found" />
    // }

    let avatar;
    if(window.innerWidth <= 426){
      avatar = <div><Avatar size="60px" className = {styles.avatar} name={name} round={true} /></div>
    } else {
      avatar = <Avatar className = {styles.avatar} name={name} round={true} />
    }


    return (
      <div className={styles.CreateAppointment}>
        <section className={styles.Main}>
          <h1 className={styles.header}>Set up Meeting</h1>
          <h2 className={styles.subheader}>Invitee</h2>
          {avatar}
          <Form
            className={styles.form}
            onSubmit={e => {
              console.log(e);
            }}
          >
            <Form.Group className={styles.datetime} controlId="dateTime">
              <div>
                <Form.Label className={styles.date}>Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="Enter Date"
                  onChange={e => this.setState({ date: e.target.value })}
                  value={this.state.date || ""}
                />
              </div>
              <div>
                <Form.Label className={styles.time}>Time</Form.Label>
                <Form.Control
                  required
                  type="time"
                  placeholder="Enter Time"
                  onChange={e => this.setState({ time: e.target.value })}
                  value={this.state.time || ""}
                />
              </div>
            </Form.Group>

            <Form.Group className={styles.location} controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows="3"
                onChange={e => this.setState({ location: e.target.value })}
                value={this.state.location || ""}
              />
            </Form.Group>

            <Form.Group className={styles.description} controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows="3"
                onChange={e => this.setState({ description: e.target.value })}
                value={this.state.description || ""}
              />
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
        </section>
        <aside className={styles.Illust} />
      </div>
    );
  }
}

export default CreateAppointment;
