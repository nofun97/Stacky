import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Avatar from "react-avatar";
import styles from "../styles/components/WorkshopCard.module.css";

class WorkshopCard extends Component {
  render() {
    return (
      <Card>
        <Avatar
          className={styles.avatar}
          src={this.props.image}
          size="150px"
          name={`${this.props.name}`}
        />
        <Card.Body>
          <div className={styles.event}>
            <Card.Title className={styles.workshop}>
              ({this.props.category}) {this.props.name}
            </Card.Title>
          </div>
          <div className={styles.bottom}>
            <a href={this.props.url} rel="noopener noreferrer" target="_blank">
              <Button className={styles.button}>More</Button>
            </a>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default WorkshopCard;
