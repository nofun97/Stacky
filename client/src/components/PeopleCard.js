import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "../styles/components/PeopleCard.module.css";

class Search extends Component {
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
        <Card.Img
          variant="top"
          src={this.props.image}
          height="150px"
          width="100px"
        />
        <Card.Body>
          <Card.Title>
            {this.props.firstName} {this.props.lastName}
          </Card.Title>
          <Card.Text>Skill: {skillString}</Card.Text>
          <Button className={styles.button} onClick={() => {}}>
            Go somewhere
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Search;
