import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import styles from "../styles/pages/Guideline.module.css";

import { connect } from "react-redux";

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    state: state
  }
}


class Guideline extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    console.log(this.props.state);
    this.props.dispatch({type: 'ADD_USER', userID: "yoman"});
    // this.props.history.goBack();
  }

  render() {
    return (
      <div className={styles.Guideline}>
        <section className={styles.Main}>
          <div>
            <h1 className={styles.header}>Guidelines</h1>
            <h2 className={styles.subheader}>
              Just some rules to follow for the comfort and safety of our users
            </h2>
          </div>
          <ul className={styles.Information}>
            <li>Treat others with courtesy and respect.</li>
            <li>
              When agreeing to meet up with another user, please do so in a
              public area.
            </li>
            <li>
              Do not ask for / reveal personal information such as <br />
              addresses and credit card information (online and irl!).
            </li>
            <li>
              Do not discuss controversial topics with other users <br />
              (politics, crime, etc.)
            </li>
            <li>
              Do not approach others with the intent of starting a<br />
              romantic/sexual relationship. This is not a dating site!
            </li>
          </ul>
          <Button
            className={styles["button"]}
            variant="primary"
            onClick={this.goBack}
          >
            Back
          </Button>
        </section>
        <aside className={styles.Illust}>
          <aside className={styles.image} />
        </aside>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Guideline);
