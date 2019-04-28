import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Slider from "rc-slider";
import InterestStyle from "../styles/components/InterestDisplay.module.css";
import SkillStyle from "../styles/components/SkillDisplay.module.css";
import "rc-slider/assets/index.css";

class InterestDisplay extends Component {

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
          level = 100;
      }
      styles = InterestStyle;
      slider = (
        <Slider
          className={styles.rail}
          railStyle={{ height: "15px", backgroundColor: "#ffb27a" }}
          trackStyle={{ height: "15px", backgroundColor: "transparent" }}
          handleStyle={{
            height:"15px",
            width:"15px",
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
                marginLeft: "25px",
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
                left: "96%",
                fontSize: "1.1em",
              },
              label: "Advanced",
            },
          }}
          step={null}
          disabled
        />
      );
    } else if (this.props.type === "Skill") {
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
          level = 100;
      }
      styles = SkillStyle;
      slider = (
        <Slider
          className={styles.rail}
          railStyle={{ height: "15px", backgroundColor: "#ff9378" }}
          trackStyle={{ height: "15px", backgroundColor: "transparent" }}
          handleStyle={{
            height:"15px",
            width:"15px",
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
                marginLeft: "37px",
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
                left: "97.5%",
                fontSize: "1.1em",
              },
              label: "Expert",
            },
          }}
          step={null}
          disabled
        />
      );
    }

    return (
      <div className={this.props.className}>
        <div className={styles.buttons}>
          <Button variant="primary" disabled className={styles.value}>
            {this.props.value}
          </Button>
        </div>
        <div className={styles.slider}>{slider}</div>
      </div>
    );
  }
}

export default InterestDisplay;
