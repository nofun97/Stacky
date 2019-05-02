import React, { Component } from "react";
import PeopleCard from "./PeopleCard";

// Need to be wrapped in div with grid on the upper layer (where this is used)
class PeopleCardList extends Component {
  render() {
    const user = this.props.values;
    const userItem = user.map(user => (
      <PeopleCard
        firstName={user.firstName}
        lastName={user.lastName}
        image={user.image}
        skill={user.skill}
        key={user._id}
      />
    ));

    return (
      [userItem]
    );
  }
}

export default PeopleCardList;
