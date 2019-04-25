import React, { Component } from "react";
import InterestDisplay from "./InterestDisplay";

class InterestDisplayList extends Component {
  render() {
    const displays = this.props.values;
    const displayItem = displays.map(display => (
      <InterestDisplay
        type={this.props.type}
        className={this.props.className}
        level={display.level}
        value={display.value}
        key={display.id}
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
