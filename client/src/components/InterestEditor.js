import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Slider from "rc-slider";
import InterestStyle from "../styles/components/InterestEditor.module.css";
import SkillStyle from "../styles/components/SkillEditor.module.css";
import "rc-slider/assets/index.css";

class InterestEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChange(value) {
    this.props.handleSliderChange(value, this.props.type, this.props.id);
  }

  handleRemove() {
    this.props.handleRemove(this.props.value , this.props.type, this.props.id);
  }

  render() {
    var slider;
    var styles;
    var level;

    if (this.props.type === "Interest") {
      switch (this.props.level) {
        case "Beginner":
          level = 0;
          break;

        case "Intermediate":
          level = 50;
          break;

        case "Advanced":
          level = 100;
          break;

        default:
          level = 0;
      }
      slider = (
        <Slider
          railStyle={{ height: "20px", backgroundColor: "#ffb27a" }}
          trackStyle={{ height: "20px", backgroundColor: "transparent" }}
          handleStyle={{
            height:"20px",
            width:"20px",
            marginTop: 0,
            backgroundColor: "#ff5a5a",
            borderColor: "transparent",
            boxShadow: "None",
          }}
          dotStyle={{ display: "None" }}
          activeDotStyle={{ display: "None" }}
          min={0}
          defaultValue={level}
          marks={{
            0: {
              style: {
                fontFamily: "lato",
                color: "#000000",
                marginTop: "5px",
                left: "4%",
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
                left: "94%",
                fontSize: "1.1em",
              },
              label: "Advanced",
            },
          }}
          step={null}
          onAfterChange={this.handleChange}
        />
      );
      styles = InterestStyle;
    } else {
      switch (this.props.level) {
        case "Intermediate":
          level = 0;
          break;

        case "Advanced":
          level = 50;
          break;

        case "Expert":
          level = 100;
          break;

        default:
          level = 0;
      }
      slider = (
        <Slider
          railStyle={{ height: "20px", backgroundColor: "#ff9378" }}
          trackStyle={{ height: "20px", backgroundColor: "transparent" }}
          handleStyle={{
            height:"20px",
            width:"20px",
            marginTop: 0,
            backgroundColor: "#ff5a5a",
            borderColor: "transparent",
            boxShadow: "None",
          }}
          dotStyle={{ display: "None" }}
          activeDotStyle={{ display: "None" }}
          min={0}
          defaultValue={level}
          marks={{
            0: {
              style: {
                fontFamily: "lato",
                color: "#000000",
                marginTop: "5px",
                left: "3vw",
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
                left: "95.5%",
                fontSize: "1.1em",
              },
              label: "Expert",
            },
          }}
          step={null}
          onAfterChange={this.handleChange}
        />
      );
      styles = SkillStyle;
    }

    return (
      <div className={this.props.className}>
        <div className={styles.buttons}>
          <Button variant="primary" disabled className={styles.value}>
            {this.props.value}
          </Button>
          <IconButton color="inherit" className={styles.icon} onClick={this.handleRemove}>
            <DeleteOutlinedIcon />
          </IconButton>
        </div>
        <div className={styles.slider}>{slider}</div>
      </div>
    );
  }
}

export default InterestEditor;
