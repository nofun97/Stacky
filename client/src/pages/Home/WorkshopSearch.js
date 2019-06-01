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
    state: state
  };
};

class WorkshopSearch extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.goToIndividuals = this.goToIndividuals.bind(this);
    this.handleCityFilter = this.handleCityFilter.bind(this);
    this.handleTopicFilter = this.handleTopicFilter.bind(this);
    this.handleFetchWorkshops = this.handleFetchWorkshops.bind(this);
    //TODO: need to add search query to workshops
    this.state = {
      workshops: [],
      //TODO: City can only be one, so data structure should be {value: {lat: "",
      // lon: ""}, label: ""}
      filteredCity: undefined,
      // should be in [{value : "" , label: ""}] format
      filteredTopic: [],
      drawerOpen: false,
      pageNumber: 1,
      totalPageNumber: 1,
      dataPerPage: 4,
      totalItem: 0,
      changes: false,
      individual: false
    };
  }

  componentDidMount = async () => this.handleFetchWorkshops();

  componentDidUpdate = async () => {
    if (this.state.changes) {
      // call fetch data function here
      console.log("Updating");
      this.handleFetchWorkshops();
      this.setState({
        changes: false
      });
    }
  };

  handleFetchWorkshops = async () => {
    var query = `/api/meetup/event?offset=${this.state.pageNumber - 1}&size=${
      this.state.dataPerPage
    }`;
    if (this.state.filteredTopic.length > 0) {
      var topics = this.state.filteredTopic.map(data => {
        return data.value;
      });
      query += `&topic=${topics.join(",")}`;
    }

    if (this.state.filteredCity !== undefined) {
      query += `&lat=${this.state.filteredCity.value.lat}&lon=${
        this.state.filteredCity.value.lon
      }`;
    }

    // if (this.state.searchQuery !== ""){
    //   query += `&text=${this.state.searchQuery}`
    // }

    //TODO: need to add date range, default value is all upcoming events in one
    //month
    // if (this.state.time !== ""){
    //   query += `&time=${this.state.time}`
    // }

    var response = await fetch(query);
    var data = await response.json();

    var workshops = data.results.map(d => {
      var start = new Date(d.time);
      var end = new Date(d.time + d.duration);
      var date = `${start.getDate()}/${start.getMonth() +
        1}/${start.getFullYear()}`;
      var duration = `${start.getHours()}:${
        start.getMinutes() < 10 ? '0' + start.getMinutes() : start.getMinutes()
      } - ${end.getHours()}:${end.getMinutes() < 10 ? '0' + end.getMinutes() : end.getMinutes()}`;
      var v = d.venue === undefined ? "" : d.venue;
      var location = v === "" ? "" : `${v.name === undefined ? "" : v.name + ","} \
      ${v.address_1 === undefined ? "" : v.address_1 + ","}
      ${v.address_2 === undefined ? "" : v.address_2 + ","}
      ${v.address_3 === undefined ? "" : v.address_3 + ","}
      ${v.city === undefined ? "" : v.city}`;
      return {
        name: d.name,
        date: date,
        time: duration,
        location: location,
        url: d.event_url,
        _id: d.id
      };
    });
    console.log(data.results.length);
    console.log(query);
    this.setState({
      ...this.state,
      workshops: workshops,
      totalPageNumber: Math.ceil(data.meta.total_count / data.meta.count),
      totalItem: data.meta.total_count,
    })
  };

  handleCityFilter = city => {
    this.setState({
      filteredCity: city,
      changes: true
    });
  };

  handleTopicFilter = topic => {
    this.setState({
      filteredTopic: [topic],
      changes: true
    });
  };

  toggleDrawer = open => () => {
    this.setState({
      drawerOpen: open
    });
  };

  goToIndividuals = () => {
    this.setState({
      individual: true
    });
  };

  //   handleNextPage = () => {
  //     if (this.state.pageNumber < this.state.totalPageNumber) {
  //         this.setState({
  //           pageNumber: this.state.pageNumber + 1,
  //           changes: true,
  //         });
  //       }
  //   };

  //   handlePreviousPage = () => {
  //     if (this.state.index > 0) {
  //         this.setState({
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
