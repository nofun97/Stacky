import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import LocationIcon from "@material-ui/icons/LocationOn";
import styles from "../styles/components/WorkshopCard.module.css";

class WorkshopCard extends Component {
  render() {
    return (
      <div className={styles.card}>
        <div className={styles.workshop}>
          <div className={styles.summary}>
            <h5 className={styles.card_heading}>
              {this.props.name}
            </h5>
            <hr className={styles.line}/>
            <div className={styles.spaced}>
              <div className={styles.workshop_detail}>
                {this.props.date} {this.props.time}
              </div>
            </div>

            <div className={styles.spaced}>
              <div className={styles.address}>
                <LocationIcon /> {this.props.location}
              </div>
              <a href={this.props.url} target="_blank" rel="noopener noreferrer">
                <Button className={styles["more-btn"]}>More</Button>
              </a>
            </div>
          </div>
          <div className={styles.label} />
        </div>
      </div>
    );
  }
}

export default WorkshopCard;
