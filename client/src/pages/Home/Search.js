import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "react-bootstrap/Button";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import PeopleCardList from "../../components/PeopleCardList";
import FilterDrawer from "../../components/FilterDrawer";
import styles from "../../styles/pages/Home/Search.module.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleSkillFilter = this.handleSkillFilter.bind(this);
    this.state = {
      user: [
        {
          firstName: "Frisco",
          lastName: "Saol",
          image: "holder.js/100px100",
          skill: [{Name:"Baking", category:"Cooking", Description:"Nothing"},{Name:"Algorithm", category:"Computing", Description:"Nothing"}],
          _id: "key",
        },
        {
          firstName: "Frisco",
          lastName: "Saol",
          image: "holder.js/100px100",
          skill: [],
          _id: "key",
        },
        {
          firstName: "Frisco",
          lastName: "Saol",
          image: "holder.js/100px100",
          skill: [],
          _id: "key",
        },
        {
          firstName: "Frisco",
          lastName: "Saol",
          image: "holder.js/100px100",
          skill: [],
          _id: "key",
        },
        {
          firstName: "Frisco",
          lastName: "Saol",
          image: "holder.js/100px100",
          skill: [],
          _id: "key",
        },
        {
          firstName: "Frisco",
          lastName: "Saol",
          image: "holder.js/100px100",
          skill: [],
          _id: "key",
        },
        {
          firstName: "Frisco",
          lastName: "Saol",
          image: "holder.js/100px100",
          skill: [],
          _id: "key",
        },
        {
          firstName: "Frisco",
          lastName: "Saol",
          image: "holder.js/100px100",
          skill: [],
          _id: "key",
        },
      ],
      drawerOpen: false,
      pageNumber: 1,
      totalPageNumber: 1,
      filterSkill: [],
      skills: [],
    };
  }

  toggleDrawer = open => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  handleSkillFilter(filteredSkills){
    this.setState({
      filterSkill:filteredSkills,
    });
  }

  render() {
    return (
      <section className={styles.container}>
        <div className={styles.options}>
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
          {/* put the thing inside of the drawer here */}
          <FilterDrawer filterSkill={this.state.filterSkill} skills={this.state.skills} onSkillFilter={this.handleSkillFilter}/>
        </Drawer>
        <div className={styles["card-container"]}>
          <PeopleCardList values={this.state.user} />
        </div>
        <div className={styles.bottom}>
          {/* need to implement this page count */}
          <span className={styles.pagination}>
            page {this.state.pageNumber} of {this.state.totalPageNumber}
          </span>
          <Button className={styles["next-btn"]}>></Button>
        </div>
      </section>
    );
  }
}

export default Search;
