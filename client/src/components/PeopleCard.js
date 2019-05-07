import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Avatar from "react-avatar";
import styles from "../styles/components/PeopleCard.module.css";

class PeopleCard extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.id);
  }

  render() {
    let skillString = [];
    let count = 0;
    for (let i of this.props.skill) {
      let element = <div className={styles.skill} key={count}>{i.Name}</div>;
      skillString.push(element);
      count++;
      if (count === 3) {
        break;
      }
    }

    return (
      <Card>
        <Avatar className={styles.avatar} src={this.props.image} size="150px" name={`${this.props.firstName} ${this.props.lastName}`}></Avatar>
        <Card.Body>
          <Card.Title className = {styles.firstName}>
            {this.props.firstName}
          </Card.Title>
          <Card.Title className = {styles.lastName}>
            {this.props.lastName}
          </Card.Title>
          <div className = {styles.cardText}>
            <div>Skill:</div>
            {skillString}
          </div>
          <Button className={styles.button} onClick={this.handleClick}>Profile</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default PeopleCard;
