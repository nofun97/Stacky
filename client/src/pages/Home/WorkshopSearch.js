import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "react-bootstrap/Button";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import WorkshopCardList from "../../components/WorkshopCardList";
import WorkshopFilter from "../../components/WorkshopFilter";

import styles from "../../styles/pages/Home/Search.module.css";

const mapStateToProps = state => {
  return {
    state: state,
  };
};

class WorkshopSearch extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      workshops: [
        {
          name: "Cleaning house expert for dummies",
          image: "",
          category: "Cleaning",
          url: "https://www.github.com",
          _id: 1,
        },
      ],
      drawerOpen: false,
      pageNumber: 1,
      totalPageNumber: 1,
      dataPerPage: 8,
      currentIndex: 0,
      totalItem: 0,
      filterSkill: [],
      skills: [],
      changes: false,
      hasSearcher: 0,
      individual: false,
    };
  }

  //   componentDidMount = async () => {};

  //   componentDidUpdate = async () => {
  //     if (this.state.changes) {
  //       this.setState({
  //         changes: false
  //       });
  //     }
  //   };

  toggleDrawer = open => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  handleClick = id => {};

  //   handleNextPage = () => {
  //     if (this.state.pageNumber < this.state.totalPageNumber) {
  //         this.setState({
  //           currentIndex: this.state.index + this.state.dataPerPage,
  //           pageNumber: this.state.pageNumber + 1,
  //           changes: true,
  //         });
  //       }
  //   };

  //   handlePreviousPage = () => {
  //     if (this.state.index > 0) {
  //         this.setState({
  //           currentIndex: this.state.index - this.state.dataPerPage,
  //           pageNumber: this.state.pageNumber - 1,
  //           changes: true,
  //         });
  //       }
  //   };

  goToIndividuals = () => {
    this.setState({
      individual: true,
    });
  };

  render() {
    if (this.state.individual === true) {
      return <Redirect to="/home/search" />;
    }

    return (
      <section className={styles.container}>
        <div className={styles.options}>
          <div className={styles.navButtons}>
            <Button
              className={styles["indiv-btn"]}
              onClick={this.goToIndividuals}
            >
              Individuals
            </Button>

            <Button
              className={styles["workshop-btn"]}
              onClick={this.goToWorkshops}
            >
              Workshops
            </Button>
          </div>

          <IconButton
            color="inherit"
            className={styles.icon}
            onClick={this.toggleDrawer(true)}
          >
            <FilterListIcon />
          </IconButton>
        </div>
        <Drawer
          anchor="right"
          open={this.state.drawerOpen}
          onClose={this.toggleDrawer(false)}
        >
          <WorkshopFilter />
        </Drawer>
        <div className={styles["card-container"]}>
          <WorkshopCardList values={this.state.workshops} />
        </div>
        <div className={styles.bottom}>
          <Button
            className={`${styles["next-btn"]} ${styles["back-btn"]}`}
            onClick={this.handlePreviousPage}
          >
            {`<`}
          </Button>
          <span className={styles.pagination}>
            Page {this.state.pageNumber} of {this.state.totalPageNumber}
          </span>
          <Button className={styles["next-btn"]} onClick={this.handleNextPage}>
            >
          </Button>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps)(WorkshopSearch);
