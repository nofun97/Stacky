import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import styles from "../../styles/pages/Home/Dashboard.module.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewAppointment: false,
    };
    this.handleAppointments = this.handleAppointments.bind(this);
  }

  handleAppointments() {
    this.setState({
      viewAppointment: true,
    });
  }

  render() {
    if (this.state.viewAppointment === true) {
      return <Redirect to="/home/appointments" />;
    }

    return (
      <section className={styles.container}>
        <div className={styles.appointment}>
          <h1 className={styles.headings}>Appointments</h1>
          <Button className={styles["button"]} onClick={this.handleAppointments}>View All</Button>
          <div className={styles.symbol}>>></div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
