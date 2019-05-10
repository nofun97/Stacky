import React, { Component } from "react";
import AppointmentExpandable from "./AppointmentExpandable";

// Need to be wrapped in div with grid on the upper layer (where this is used)
class AppointmentExpandableList extends Component {
  render() {
    const appointments = this.props.values;
    const appointmentItem = appointments.map(appointment => (
      <AppointmentExpandable 
        type={this.props.type}
        handleAccept={this.props.handleAccept}
        handleReject={this.props.handleReject}
        name={`${appointment.firstName} ${appointment.lastName}`}
        date={appointment.date}
        time={appointment.time}
        address={appointment.address}
        description={appointment.description}
        id={appointment._id}
        key={appointment._id}
      />
    ));

    return [appointmentItem];
  }
}

export default AppointmentExpandableList;
