import React, { Component } from "react";
import FeedbackNotification from "./FeedbackNotification";

// Need to be wrapped in div with grid on the upper layer (where this is used)
class FeedbackNotificationList extends Component {
  render() {
    const feedbacks = this.props.values;
    const feedbackItem = feedbacks.map(feedback => (
      <FeedbackNotification 
        name={`${feedback.firstName} ${feedback.lastName}`}
      />
    ));

    return [feedbackItem];
  }
}

export default FeedbackNotificationList;
