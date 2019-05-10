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
      changes: false,
    };
    this.approveRequest = this.approveRequest.bind(this);
    this.deleteRequest = this.deleteRequest.bind(this);
    this.handleFetchAppointment = this.handleFetchAppointment.bind(this);
  }

  approveRequest = async id => {
    await fetch(`http://localhost:5000/api/appointment/approve/${id}`, {
      credentials: "include",
      method: "POST",
    });
    this.setState({ changes: true });
  };

  deleteRequest = async id => {
    await fetch(`http://localhost:5000/api/appointment/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
    this.setState({changes: true});
  }

  render() {
    return (
      <section className={styles.container}>
        <div className={styles.invites}>
          <h1 className={styles.headers}>Meeting Invites</h1>
          <AppointmentExpandableList
            values={this.state.invites}
            type="invites"
            handleAccept={this.approveRequest}
            handleReject={this.deleteRequest}
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

  componentDidMount = async () => {
    this.handleFetchAppointment();
  };

  componentDidUpdate = async () => {
    if (this.state.changes === true) {
      this.handleFetchAppointment();
      this.setState({ changes: false });
    }
  };

  handleFetchAppointment = async () => {
    var appointmentsData = await fetch(
      `http://localhost:5000/api/appointment?user=${this.props.id}`,
      {
        credentials: "include",
      }
    );

    var appointments = await appointmentsData.json();
    let meetingInvites = [];
    let pendingInvites = [];
    let upcomingMeeting = [];

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

      if (data.Invitee === this.props.id) {
        if (data.IsApproved) {
          upcomingMeeting.push({
            firstName: data.CreatorFirstName,
            lastName: data.CreatorLastName,
            description: data.Description,
            time: `${hours}:${minutes}`,
            date: `${time.getDate()}/${time.getMonth() +
              1}/${time.getFullYear()}`,
            address: data.Address,
            _id: data._id,
          });
          return;
        }
        meetingInvites.push({
          firstName: data.CreatorFirstName,
          lastName: data.CreatorLastName,
          description: data.Description,
          time: `${hours}:${minutes}`,
          date: `${time.getDate()}/${time.getMonth() +
            1}/${time.getFullYear()}`,
          address: data.Address,
          _id: data._id,
        });
      } else if (data.Creator === this.props.id) {
        if (!data.IsApproved) {
          pendingInvites.push({
            firstName: data.InviteeFirstName,
            lastName: data.InviteeLastName,
            description: data.Description,
            time: `${hours}:${minutes}`,
            date: `${time.getDate()}/${time.getMonth() +
              1}/${time.getFullYear()}`,
            address: data.Address,
            _id: data._id,
          });
          return;
        }
        upcomingMeeting.push({
          firstName: data.InviteeFirstName,
          lastName: data.InviteeLastName,
          description: data.Description,
          time: `${hours}:${minutes}`,
          date: `${time.getDate()}/${time.getMonth() +
            1}/${time.getFullYear()}`,
          address: data.Address,
          _id: data._id,
        });
      }
    });

    this.setState({
      appointments: upcomingMeeting,
      pendingInvites: pendingInvites,
      invites: meetingInvites,
    });
  };
}

export default AllAppointment;
