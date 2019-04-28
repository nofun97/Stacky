import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

import styles from "../styles/pages/VerificationPass.module.css";

class VerificationPass extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      clicked: false
    }
  }

  handleClick() {
    this.setState({
      clicked: true,
    })
  }

  render() {
    if(this.state.clicked){
      return <Redirect
      to={{
        pathname: "/list_skill",
        state: this.props.location.state,
      }}
    />
    }

    return (
      <div className={styles.VerificationPass}>
        <section className={styles.Main}>
            <h1 className={styles.header}>
              Verification 
              Successful!
            </h1>

            <h2 className={styles.subheader}>
              You now have full access to our services.
            </h2>
          <Button className={styles["button"]} variant="primary" onClick={this.handleClick}>
            Skills and Interests
          </Button>
        </section>
        <aside className={styles.Illust}>
          <aside className={styles.image} />
        </aside>
      </div>
    );
  }
}

export default VerificationPass;
