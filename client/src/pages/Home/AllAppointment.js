import React, { Component } from "react";
import styles from "../../styles/pages/Home/AllAppointment.module.css";
import AppointmentExpandableList from "../../components/AppointmentExpandableList";

class AllAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invites: [],
      appointments: [],
      pendingInvites: [],
    };
  }

  render() {
    return (
      <section className={styles.container}>
        <div className={styles.invites}>
          <h1 className={styles.headers}>Meeting Invites</h1>
          <AppointmentExpandableList
            values={this.state.invites}
            type="invites"
            handleAccept={() => {}}
            handleReject={() => {}}
          />
        </div>
        <div className={styles.invites}>
          <h1 className={styles.headers}>Upcoming Meetings</h1>
          <AppointmentExpandableList values={this.state.appointments} />
        </div>
        <div className={styles.invites}>
          <h1 className={styles.headers}>Pending Invites</h1>
          <AppointmentExpandableList values={this.state.pendingInvites} />
        </div>
      </section>
    );
  }
  approveRequest = async () => {
    var approveData = await fetch({});
  };
  componentDidMount = async () => {
    var appointmentsData = await fetch(
      `http://localhost:5000/api/appointment?user=${this.props.id}`,
      {
        credentials: "include",
      }
    );

    var appointments = await appointmentsData.json();

    appointments.forEach(data => {
      var time = new Date(data.Time);
      var hours = time.getHours();
      if (hours < 10) {
        hours = `0${hours}`;
      }
      var minutes = time.getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      console.log(time);
      if (data.Invitee === this.props.id) {
        if (data.IsApproved) {
          this.setState({
            ...this.state,
            appointments: [
              ...this.state.appointments,
              {
                firstName: data.InviteeFirstName,
                lastName: data.InviteeLastName,
                description: data.Description,
                time: `${hours}:${minutes}`,
                date: `${time.getDate()}/${time.getMonth() +
                  1}/${time.getFullYear()}`,
                address: data.Address,
                _id: data._id,
              },
            ],
          });
          return;
        }
        this.setState({
          ...this.state,
          invites: [
            ...this.state.invites,
            {
              firstName: data.CreatorFirstName,
              lastName: data.CreatorLastName,
              description: data.Description,
              time: `${hours}:${minutes}`,
              date: `${time.getDate()}/${time.getMonth() +
                1}/${time.getFullYear()}`,
              address: data.Address,
              _id: data._id,
            },
          ],
        });
      } else if (data.Creator === this.props.id) {
        if (!data.IsApproved) {
          this.setState({
            ...this.state,
            pendingInvites: [
              ...this.state.pendingInvites,
              {
                firstName: data.CreatorFirstName,
                lastName: data.CreatorLastName,
                description: data.Description,
                time: `${hours}:${minutes}`,
                date: `${time.getDate()}/${time.getMonth() +
                  1}/${time.getFullYear()}`,
                address: data.Address,
                _id: data._id,
              },
            ],
          });
          return;
        }
        this.setState({
          ...this.state,
          appointments: [
            ...this.state.appointments,
            {
              firstName: data.InviteeFirstName,
              lastName: data.InviteeLastName,
              description: data.Description,
              time: `${hours}:${minutes}`,
              date: `${time.getDate()}/${time.getMonth() +
                1}/${time.getFullYear()}`,
              address: data.Address,
              _id: data._id,
            },
          ],
        });
      }
    });

    console.log(this.state);
  };
}

export default AllAppointment;
