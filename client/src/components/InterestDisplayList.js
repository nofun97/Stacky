import React, { Component } from "react";
import InterestDisplay from "./InterestDisplay";

class InterestDisplayList extends Component {
  render() {
    const displays = this.props.values;
    const displayItem = displays.map(display => (
      <InterestDisplay
        type={this.props.type}
        className={this.props.className}
        level={display.Level}
        value={display.Name}
        id={display.Skill}
        key={display.Skill}
      />
    ));

    return (
      <div>
        {displayItem}
      </div>
    );
  }
}

export default InterestDisplayList;
