import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Avatar from "react-avatar";
import styles from "../styles/components/WorkshopCard.module.css";

class WorkshopCard extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.id);
  }

  render() {
    return (
      <Card>
        <Avatar className={styles.avatar} src={this.props.image} size="150px" name={`${this.props.firstName} ${this.props.lastName}`}></Avatar>
        <Card.Body>
          <div className={styles.event}>
            <Card.Title className = {styles.skill}>
                (Skill Name)
            </Card.Title>
            <Card.Title className = {styles.workshop}>
                Workshop
            </Card.Title>
          </div>
          <div className={styles.bottom}>
             <Button className={styles.button} onClick={this.handleClick}>More</Button>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default WorkshopCard;