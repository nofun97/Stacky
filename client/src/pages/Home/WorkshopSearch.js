import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "react-bootstrap/Button";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import WorkshopCardList from "../../components/WorkshopCardList";
import WorkshopFilter from "../../components/WorkshopFilter";

import styles from "../../styles/pages/Home/WorkshopSearch.module.css";

const mapStateToProps = state => {
  return {
    state: state,
  };
};

class WorkshopSearch extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.goToIndividuals = this.goToIndividuals.bind(this);
    this.handleCityFilter = this.handleCityFilter.bind(this);
    this.handleTopicFilter = this.handleTopicFilter.bind(this);
    this.state = {
      workshops: [
        {
          name:
            "Cleaning house expert for dummies everyone can do it let's go man oy yoy yo yo yo yo yo yo yo yo yo yo yo yo yo yo y y asdasd ad sadasdas",
          date: "03/09/2019",
          time: "16:00 - 18:00",
          location: "321 Grattan Street, Melbourne",
          url: "https://www.github.com",
          _id: 1,
        },
        {
          name: "Cleaning house expert for dummies",
          date: "03/09/2019",
          time: "16:00 - 18:00",
          location: "321 Grattan Street, Melbourne",
          url: "https://www.github.com",
          _id: 2,
        },
      ],
      // should be in [{value : "" , label: ""}] format
      filteredCity: [],
      // should be in [{value : "" , label: ""}] format
      filteredTopic: [],
      drawerOpen: false,
      pageNumber: 1,
      totalPageNumber: 1,
      dataPerPage: 4,
      currentIndex: 0,
      totalItem: 0,
      changes: false,
      individual: false,
    };
  }

  componentDidMount = async () => {};

  componentDidUpdate = async () => {
    if (this.state.changes) {
      // call fetch data function here

      this.setState({
        changes: false
      });
    }
  };

  handleCityFilter = (city) => {
    this.setState({
      filteredCity: [city],
      changes: true,
    })
  }

  handleTopicFilter = (topic) => {
    this.setState({
      filteredTopic: [topic],
      changes: true,
    })
  }

  toggleDrawer = open => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  goToIndividuals = () => {
    this.setState({
      individual: true,
    });
  };

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
          <WorkshopFilter
            filteredCity={this.state.filteredCity}
            filteredTopic={this.state.filteredTopic}
            handleCityFilter={this.handleCityFilter}
            handleTopicFilter={this.handleTopicFilter}
          />
        </Drawer>
        <div>
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
