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
    let skillString = "";
    let count = 0;
    for (let i of this.props.skill) {
      skillString += `${i.Name} `;
      count++;
      if (count === 3) {
        break;
      }
    }

    return (
      <Card>
        <Avatar className={styles.avatar} src={this.props.image} size="150px" name={`${this.props.firstName} ${this.props.lastName}`}></Avatar>
        <Card.Body>
          <Card.Title>
            {this.props.firstName} {this.props.lastName}
          </Card.Title>
          <Card.Text>Skill: {skillString}</Card.Text>
          <Button className={styles.button} onClick={this.handleClick}>Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default PeopleCard;
