import React, { Component } from "react";
import WorkshopCard from "./WorkshopCard";

// Need to be wrapped in div with grid on the upper layer (where this is used)
class WorkshopCardList extends Component {
  render() {
    const workshop = this.props.values;
    const workshopItem = workshop.map(workshop => (
      <WorkshopCard
        name={workshop.name}
        image={workshop.image}
        category={workshop.category}
        url={workshop.url}
        id={workshop._id}
        key={workshop._id}
      />
    ));

    return (
      [workshopItem]
    );
  }
}

export default WorkshopCardList;
