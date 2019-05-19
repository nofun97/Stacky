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
      learnerFeedback: [],
      teacherFeedback: [],
      //TODO: implement pagination
      index: 0,
      size: 8,
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
  }

  handleBack(){
    this.setState({
      backHome: true,
    })
  }


  handleFetch = async () => {
    const URL = '/api/review';
    const query = `?id=${this.props.id}&from=${this.state.index}&size=${this.state.size}`;
    const option = {
      credentials: "include",
      method: "GET"
    }
    console.log(URL + query);
    const status = await fetch(URL + query, option);
    const response = await status.json();
    if (response.error !== undefined){
      console.log(response.error);
      return;
    }
    console.log(response);
    var student = response.asReviewee.filter(e => e.Type === "Student");
    var teacher = response.asReviewee.filter(e => e.Type === "Teacher");

    student = student.map(e => {
      return {
        firstName: e.ReviewerFirstName,
        lastName: e.ReviewerLastName,
        pros: e.Pros,
        cons: e.Cons,
        _id: e._id,
      };
    });

    teacher = teacher.map(e => {
      return {
        firstName: e.ReviewerFirstName,
        lastName: e.ReviewerLastName,
        pros: e.Pros,
        cons: e.Cons,
        _id: e._id,
      };
    });
    console.log(student);
    console.log(teacher);
    this.setState({
      ...this.state,
      learnerFeedback: student,
      teacherFeedback: teacher,
    })
  }

  handleNextPage = () => this.setState({index: this.state.index + this.state.size});

  componentDidMount = async () => await this.handleFetch();

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
