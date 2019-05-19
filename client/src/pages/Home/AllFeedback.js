import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import styles from "../../styles/pages/Home/AllFeedback.module.css";
import FeedbackDetailsList from "../../components/FeedbackDetailsList";

class AllFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backHome: false,
      learnerFeedback: [
        {
          firstName: "Raol",
          lastName: "Slioco",
          pros:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere porro delectus aspernatur iure debitis placeat accusantium odio. Fugiat unde consequatur, tempore consequuntur sapiente quisquam sed aut, temporibus quas voluptatibus deserunt nam even.",
          cons: "THIS A NON VALID STATEMENT AND IT IS FULL OF NEGATIVITY",
          _id: 1,
        },
      ],
      teacherFeedback: [
        {
          firstName: "Raol",
          lastName: "Slioco",
          pros:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere porro delectus aspernatur iure debitis placeat accusantium odio. Fugiat unde consequatur, tempore consequuntur sapiente quisquam sed aut, temporibus quas voluptatibus deserunt nam even.",
          cons: "THIS A NON VALID STATEMENT AND IT IS FULL OF NEGATIVITY",
          _id: 2,
        },
      ],
    };
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack(){
    this.setState({
      backHome: true,
    })
  }

  render() {
    if(this.state.backHome === true){
      return <Redirect to="/home"/>;
    }

    return (
      <section className={styles.container}>
        <div className={styles.feedback}>
          <h1 className={styles.headings}>Learner Feedback</h1>
          <FeedbackDetailsList values={this.state.learnerFeedback} />
        </div>

        <div className={styles.feedback}>
          <h1 className={styles.headings}>Teacher Feedback</h1>
          <FeedbackDetailsList values={this.state.teacherFeedback} />
        </div>

        <div className={styles.bottom}>
          <div className={styles.goHome}>
            <Button className={styles.button} onClick={this.handleBack}>Back to My Home</Button>
          </div>

          <div className={styles.nav}>
            <Button
              className={`${styles["next-btn"]} ${styles["back-btn"]}`}
              onClick={this.handlePreviousPage}
            >
              {`<`}
            </Button>
            <span className={styles.pagination}>
              page {this.state.pageNumber} of {this.state.totalPageNumber}
            </span>
            <Button className={styles["next-btn"]} onClick={this.handleNextPage}>
              >
            </Button>
          </div>
        </div>
      </section>
    );
  }
}

export default AllFeedback;
