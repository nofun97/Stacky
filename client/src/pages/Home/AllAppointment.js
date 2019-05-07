import React, { Component } from "react";
import styles from "../../styles/pages/Home/AllAppointment.module.css";
import AppointmentExpandableList from "../../components/AppointmentExpandableList";

class AllAppointment extends Component {
  constructor(props) {
    super(props);
    this.state={
      invites: [{firstName: "Frisco", lastName: "Saol", description: "Meeting to study about essay writing", time: "16.00 pm", date: "03/20/2019", address: "200 Cardigan St, Carlton 3053", _id:"909"}],
      appointments: [{firstName: "Frisco", lastName: "Saol", description: "Meeting to study about algorithm", time: "16.00 pm", date: "03/20/2019", address: "200 Cardigan St, Carlton 3053", _id:"1000"}],
    }
  }

  render() {
    return (
      <section className={styles.container}>
        <div className={styles.invites}>
          <h1 className={styles.headers}>Meeting Invites</h1>
          <AppointmentExpandableList values={this.state.invites} type="invites" handleAccept={()=>{}} handleReject={() => {}} />
        </div>
        <div className={styles.invites}>
          <h1 className={styles.headers}>Upcoming Meetings</h1>
          <AppointmentExpandableList values={this.state.appointments} />
        </div>
        <div className={styles.invites}>
          <h1 className={styles.headers}>Pending Invites</h1>
          <AppointmentExpandableList values={this.state.appointments} />
        </div>
      </section>
    );
  }
}

export default AllAppointment;
