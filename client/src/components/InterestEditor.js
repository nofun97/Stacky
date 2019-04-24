import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Slider from "rc-slider";
import styles from "../styles/components/InterestEditor.module.css";
import "rc-slider/assets/index.css";

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
          railStyle={{ height: "15px", backgroundColor: "#ffb27a" }}
          trackStyle={{ height: "15px", backgroundColor: "transparent" }}
          handleStyle={{
            marginTop: 0,
            backgroundColor: "#ff5a5a",
            borderColor: "transparent",
            boxShadow: "None",
          }}
          dotStyle={{ display: "None" }}
          activeDotStyle={{ display: "None" }}
          min={0}
          defaultValue={0}
          marks={{
            0: {
              style: {
                fontFamily: "lato",
                color: "#000000",
                marginTop: "5px",
                fontSize: "1.1em",
              },
              label: "Beginner",
            },
            50: {
              style: {
                fontFamily: "lato",
                color: "#000000",
                marginTop: "5px",
                fontSize: "1.1em",
              },
              label: "Intermediate",
            },
            100: {
              style: {
                fontFamily: "lato",
                color: "#000000",
                marginTop: "5px",
                fontSize: "1.1em",
              },
              label: "Advanced",
            },
          }}
          step={null}
          onAfterChange={this.handleChange}
        />
      );
    } else {
      slider = (
        <Slider
          railStyle={{ height: "15px", backgroundColor: "#ffb27a" }}
          trackStyle={{ height: "15px", backgroundColor: "transparent" }}
          handleStyle={{
            marginTop: 0,
            backgroundColor: "#ff5a5a",
            borderColor: "transparent",
            boxShadow: "None",
          }}
          dotStyle={{ display: "None" }}
          activeDotStyle={{ display: "None" }}
          min={0}
          defaultValue={0}
          marks={{
            0: {
              style: {
                fontFamily: "lato",
                color: "#000000",
                marginTop: "5px",
                fontSize: "1.1em",
              },
              label: "Intermediate",
            },
            50: {
              style: {
                fontFamily: "lato",
                color: "#000000",
                marginTop: "5px",
                fontSize: "1.1em",
              },
              label: "Advanced",
            },
            100: {
              style: {
                fontFamily: "lato",
                color: "#000000",
                marginTop: "5px",
                fontSize: "1.1em",
              },
              label: "Expert",
            },
          }}
          step={null}
          onAfterChange={this.handleChange}
        />
      );
    }

    return (
      <div className={this.props.className}>
        <div className={styles.buttons}>
          <Button variant="primary" disabled className={styles.value}>
            {this.props.value}
          </Button>
          <IconButton color="inherit" className={styles.icon} onClick={this.props.handleRemove}>
            <DeleteOutlinedIcon />
          </IconButton>
        </div>
        <div className={styles.slider}>{slider}</div>
      </div>
    );
  }
}

export default InterestEditor;
