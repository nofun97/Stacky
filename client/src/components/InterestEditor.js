import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "../styles/components/InterestEditor.module.css";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

class InterestEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChange(value) {
    this.props.handleSliderChange(value);
  }

  handleRemove() {
    this.props.handleRemove(this.props.value);
  }

  render() {
    var slider;
    if (this.props.type === "Interest") {
      slider = (
        <Slider
          railStyle={{height: "15px"}}
          trackStyle={{height: "15px"}}
          handleStyle={{marginTop: 0}}
          dotStyle={{display: "None"}}
          activeDotStyle={{display: "None"}}
          min={0}
          defaultValue={0}
          marks={{ 0: "Beginner", 50: "Intermediate", 100: "Advanced" }}
          step={null}
          onAfterChange={this.handleChange}
        />
      );
    } else {
      slider = (
        <Slider
          min={0}
          defaultValue={0}
          marks={{ 0: "Intermediate", 50: "Advanced", 100: "Expert" }}
          step={null}
          onAfterChange={this.handleChange}
        />
      );
    }

    return (
      <div className={this.props.className}>
        <div className={styles.buttons}>
          <Button variant="secondary" disabled>
            {" "}
            {this.props.value}{" "}
          </Button>
          <IconButton className={styles.icon} onClick={this.props.handleRemove}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div className={styles.slider}>{slider}</div>
      </div>
    );
  }
}

export default InterestEditor;
