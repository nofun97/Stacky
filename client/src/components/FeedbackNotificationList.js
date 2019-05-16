import React, { Component } from "react";
import FeedbackNotification from "./FeedbackNotification";

class FeedbackNotificationList extends Component {
  render() {
    const feedbacks = this.props.values;
    const feedbackItem = feedbacks.map(feedback => (
      <FeedbackNotification 
        name={`${feedback.firstName} ${feedback.lastName}`}
        key={feedback._id}
      />
    ));

    return [feedbackItem];
  }
}

export default FeedbackNotificationList;
