import React, { Component } from "react";
import FeedbackDetails from "./FeedbackDetails";

class FeedbackDetailsList extends Component {
  render() {
    const feedbacks = this.props.values;
    const feedbackItem = feedbacks.map(feedback => (
      <FeedbackDetails 
        name={`${feedback.firstName} ${feedback.lastName}`}
        pros={feedback.pros}
        cons={feedback.cons}
      />
    ));

    return [feedbackItem];
  }
}

export default FeedbackDetailsList;
